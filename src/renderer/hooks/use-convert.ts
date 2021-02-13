import { useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import {
  inputFilePathState,
  stringOptionStateFamily,
  numberOptionStateFamily,
  boolOptionsStateFamily,
  cropOptionState,
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
    window.log.log(option);
    window.api.convert(inputFilePath, option);
  }, [inputFilePath, option]);

  return { convert };
};
