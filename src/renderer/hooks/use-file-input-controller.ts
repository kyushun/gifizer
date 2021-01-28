import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSetRecoilState } from 'recoil';

import { getFilename } from '@renderer/util';

import { inputFileInfoState, inputFilePathState } from '@recoil/atoms';

export const useFileInputController = () => {
  const setInputFilePath = useSetRecoilState(inputFilePathState);
  const setInputFileInfo = useSetRecoilState(inputFileInfoState);

  const setFilePath = useCallback(async (filePath: string) => {
    if (filePath === '') return;

    const result = await window.api.inspectFile(filePath);
    if (result === undefined) {
      alert(`${getFilename(filePath)} is invalid file.`);
      return;
    }

    setInputFilePath(filePath);
    setInputFileInfo(result);
  }, []);

  const onDrop = useCallback(async (files: File[]) => {
    if (files.length < 1) return;

    const filePath = files[0].path;
    setFilePath(filePath);
  }, []);

  const dropzoneState = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return { ...dropzoneState, setFilePath };
};
