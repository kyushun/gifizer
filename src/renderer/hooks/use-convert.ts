import { useCallback, useMemo } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import {
  inputFilePathState,
  stringOptionStateFamily,
  numberOptionStateFamily,
  boolOptionsStateFamily,
  cropOptionState,
  convertStatusState,
} from '@recoil/atoms/index';

import { ConvertOption } from '@shared/types';

export const useConvert = () => {
  const inputFilePath = useRecoilValue(inputFilePathState);
  const outputPath = useRecoilValue(stringOptionStateFamily('option/filename'));
  const width = useRecoilValue(numberOptionStateFamily('option/width'));
  const height = useRecoilValue(numberOptionStateFamily('option/height'));
  const fps = useRecoilValue(numberOptionStateFamily('option/fps'));
  const palette = useRecoilValue(boolOptionsStateFamily('option/palette'));
  const startTime = useRecoilValue(numberOptionStateFamily('option/startTime'));
  const endTime = useRecoilValue(numberOptionStateFamily('option/endTime'));
  const crop = useRecoilValue(cropOptionState);
  const setConvertStatus = useSetRecoilState(convertStatusState);

  const option: ConvertOption = useMemo(
    () => ({
      outputPath,
      width,
      height,
      fps,
      palette,
      startTime,
      endTime,
      crop,
    }),
    [fps, height, outputPath, palette, width, startTime, endTime, crop]
  );

  const convert = useCallback(() => {
    if (!inputFilePath) return;

    window.log.log(option);
    window.api.convert(inputFilePath, option).catch((e) => {
      const errorMessage = e.message.split(':').slice(-1)[0];

      window.log.error(e);
      setConvertStatus({
        status: 'ERROR',
        message: errorMessage,
      });
    });
  }, [inputFilePath, option, setConvertStatus]);

  return { convert };
};
