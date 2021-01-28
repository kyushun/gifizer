import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { getFilename } from '@renderer/util';

import { useFileInputController } from '@hooks/use-file-input-controller';

import { inputFilePathState } from '@recoil/atoms';

import addFileIconSvg from './add-file-icon.svg';
import convertIconSvg from './convert-icon.svg';
import cropIconSvg from './crop-icon.svg';
import cutIconSvg from './cut-icon.svg';
import { MenuIcon } from './MenuIcon';
import {
  StyledHeaderAppName,
  StyledHeaderWrapper,
  StyledMenuIconWrapper,
} from './Styled';

export const Header = () => {
  const inputFilePath = useRecoilValue(inputFilePathState);
  const { setFilePath } = useFileInputController();

  const onClickOpenFile = useCallback(async () => {
    const result = await window.api.showOpenDialog();
    if (result.canceled || result.filePaths.length < 1) return;

    setFilePath(result.filePaths[0]);
  }, []);

  return (
    <StyledHeaderWrapper>
      <StyledMenuIconWrapper left={100} onClick={onClickOpenFile}>
        <MenuIcon width={60} icon={addFileIconSvg} text="Open File" />
      </StyledMenuIconWrapper>
      <StyledMenuIconWrapper left={160}>
        <MenuIcon width={50} icon={cutIconSvg} text="Cut" />
      </StyledMenuIconWrapper>
      <StyledMenuIconWrapper left={210}>
        <MenuIcon width={50} icon={cropIconSvg} text="Crop" />
      </StyledMenuIconWrapper>

      <StyledHeaderAppName>
        {getFilename(inputFilePath) || 'Gifizer'}
      </StyledHeaderAppName>

      <StyledMenuIconWrapper right={30}>
        <MenuIcon width={60} icon={convertIconSvg} text="Convert" />
      </StyledMenuIconWrapper>
    </StyledHeaderWrapper>
  );
};
