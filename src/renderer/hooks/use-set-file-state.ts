import { useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import {
  inputFilePathState,
  inputFileInfoState,
  stringOptionStateFamily,
} from '@renderer/recoil/atoms';
import { changeExtension } from '@renderer/util';

import { InspectData } from '@shared/types';

export const useSetFileState = () => {
  const setInputFilePath = useSetRecoilState(inputFilePathState);
  const setInputFileInfo = useSetRecoilState(inputFileInfoState);
  const setOptionFileName = useSetRecoilState(
    stringOptionStateFamily('option/filename')
  );

  const setFileState = useCallback(
    (filePath: string, inspectData: InspectData) => {
      setInputFilePath(filePath);
      setInputFileInfo(inspectData);
      setOptionFileName(changeExtension(filePath, 'gif'));
    },
    [setInputFileInfo, setInputFilePath, setOptionFileName]
  );

  return setFileState;
};
