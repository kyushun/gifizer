import { useCallback, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import {
  inputFilePathState,
  stringOptionStateFamily,
  numberOptionStateFamily,
  boolOptionsStateFamily,
} from '@recoil/atoms/index';

import { ConvertOption } from '@shared/types';

export const useConvert = () => {
  const inputFilePath = useRecoilValue(inputFilePathState);
  const outputPath = useRecoilValue(stringOptionStateFamily('option/filename'));
  const width = useRecoilValue(numberOptionStateFamily('option/width'));
  const height = useRecoilValue(numberOptionStateFamily('option/height'));
  const fps = useRecoilValue(numberOptionStateFamily('option/fps'));
  const palette = useRecoilValue(boolOptionsStateFamily('option/palette'));

  const option: ConvertOption = useMemo(
    () => ({ outputPath, width, height, fps, palette }),
    [fps, height, outputPath, palette, width]
  );

  const convert = useCallback(() => {
    window.api.convert(inputFilePath, option);
  }, [inputFilePath, option]);

  return { convert };
};
