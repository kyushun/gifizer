import log from 'electron-log';
import ffmpeg from 'fluent-ffmpeg';
import { promisify } from 'util';

import { InspectData } from '@shared/types';

const ffprobeAsync = promisify<string, ffmpeg.FfprobeData>(ffmpeg.ffprobe);

export const inspectFile = async (
  filePath: string
): Promise<InspectData | undefined> => {
  log.info(`Inspecting file: ${filePath}`);

  const data = await ffprobeAsync(filePath).catch((err) => {
    log.error(err);
    return undefined;
  });

  log.debug(data);

  const videoStream = data?.streams.find(
    (stream) => stream.codec_type === 'video'
  );
  if (data === undefined || videoStream === undefined) {
    log.error('Input file is not a video');
    return undefined;
  }

  const fps = (() => {
    const formula = videoStream.avg_frame_rate || '';
    const match = formula.match(/^(\d+)\/(\d+)$/);
    if (!match) return NaN;

    const [, numer, denom] = match;
    return parseInt(numer, 10) / parseInt(denom, 10);
  })();

  if (Number.isNaN(fps)) return undefined;

  return {
    size: data.format.size || 0,
    codec: videoStream.codec_name || '',
    width: videoStream.width || 0,
    height: videoStream.height || 0,
    fps,
  };
};
