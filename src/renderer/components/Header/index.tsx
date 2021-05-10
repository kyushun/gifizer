import { useCallback } from 'react';
import { useRecoilValue } from 'recoil';

import { getFilename } from '@renderer/util';

import { useConvert, useFileInputController } from '@hooks/index';

import { inputFilePathState } from '@recoil/atoms';

import { isDarwin } from '@shared/util';

import addFileIconSvg from './add-file-icon.svg';
import convertIconSvg from './convert-icon.svg';
import { MenuIcon } from './MenuIcon';
import * as Styled from './Styled';
import { TitleBar } from './TitleBar';

type ComponentProps = {
  isMac: boolean;
  inputFilePath: string;
  onClickOpenFile: () => void;
  convert: () => void;
};

export const HeaderComponent = ({
  isMac,
  inputFilePath,
  onClickOpenFile,
  convert,
}: ComponentProps) => (
  <>
    {!isMac && <TitleBar />}

    <Styled.Container>
      <Styled.IconWrapper left={isMac ? 100 : 15} onClick={onClickOpenFile}>
        <MenuIcon width={60} icon={addFileIconSvg} text="Open File" />
      </Styled.IconWrapper>

      {isMac && (
        <Styled.AppName>
          {getFilename(inputFilePath) || 'Gifizer'}
        </Styled.AppName>
      )}

      <Styled.IconWrapper right={isMac ? 30 : 15} onClick={convert}>
        <MenuIcon width={60} icon={convertIconSvg} text="Convert" />
      </Styled.IconWrapper>
    </Styled.Container>
  </>
);

export const Header = () => {
  const inputFilePath = useRecoilValue(inputFilePathState);
  const { inspectAndSetFileState } = useFileInputController();
  const { convert } = useConvert();

  const onClickOpenFile = useCallback(async () => {
    const result = await window.api.showOpenDialog();
    if (result.canceled || result.filePaths.length < 1) return;

    inspectAndSetFileState(result.filePaths[0]);
  }, [inspectAndSetFileState]);

  return (
    <HeaderComponent
      isMac={isDarwin}
      inputFilePath={inputFilePath}
      onClickOpenFile={onClickOpenFile}
      convert={convert}
    />
  );
};
