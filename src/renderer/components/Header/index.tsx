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
    <>
      {!isDarwin && <TitleBar />}

      <Styled.Container>
        <Styled.IconWrapper
          left={isDarwin ? 100 : 15}
          onClick={onClickOpenFile}
        >
          <MenuIcon width={60} icon={addFileIconSvg} text="Open File" />
        </Styled.IconWrapper>

        {isDarwin && (
          <Styled.AppName>
            {getFilename(inputFilePath) || 'Gifizer'}
          </Styled.AppName>
        )}

        <Styled.IconWrapper right={isDarwin ? 30 : 15} onClick={convert}>
          <MenuIcon width={60} icon={convertIconSvg} text="Convert" />
        </Styled.IconWrapper>
      </Styled.Container>
    </>
  );
};
