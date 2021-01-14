import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSetRecoilState } from 'recoil';

import { DropNavigationModal } from './DropNavigationModal';
import { OptionContainer } from './OptionContainer';
import { PlayerContainer } from './PlayerContainer';
import { StyledContent } from './Styled';
import { inputFilePathState } from '@renderer/recoil/atoms';

export const AppContent = () => {
  const setInputFilePathState = useSetRecoilState(inputFilePathState);

  const onDrop = useCallback((files: File[]) => {
    if (files.length < 1) return;

    const filePath = files[0].path;
    setInputFilePathState(filePath);
  }, []);

  const { getRootProps, isDragActive } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
  });

  return (
    <StyledContent {...(getRootProps() as any)}>
      <PlayerContainer />
      <OptionContainer />

      <DropNavigationModal isVisible={isDragActive} />
    </StyledContent>
  );
};
