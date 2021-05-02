/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useVideoController } from '@hooks/index';

import { inputFilePathState, playerRefState } from '@recoil/atoms';

import { Cropper } from './Cropper';
import * as Styled from './Styled';
import { useKeyInput } from './use-key-input';
import { usePlayerSizeSetter } from './use-player-size-setter';
import { VideoController } from './VideoController';

export const VideoPlayer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const playerSizeRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const filePath = useRecoilValue(inputFilePathState);
  const setPlayerRefState = useSetRecoilState(playerRefState);

  useEffect(() => {
    setPlayerRefState(videoRef);
  }, [setPlayerRefState]);

  const { togglePlaying } = useVideoController();
  useKeyInput();
  usePlayerSizeSetter(playerSizeRef, containerRef);

  return (
    <Styled.Wrapper>
      <Styled.Container ref={containerRef}>
        <Styled.PlayerWrapper ref={playerSizeRef}>
          <Styled.Player
            ref={videoRef}
            src={filePath && `file:${filePath}`}
            preload="auto"
            onClick={togglePlaying}
          />
          <Cropper />
        </Styled.PlayerWrapper>
      </Styled.Container>

      <VideoController />
    </Styled.Wrapper>
  );
};
