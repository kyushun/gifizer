/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useMemo, useRef } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { isUrl } from '@renderer/util';

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

  const videoSrc = useMemo(() => {
    if (!filePath) return undefined;

    return isUrl(filePath) ? filePath : `file:${filePath}`;
  }, [filePath]);

  return (
    <Styled.Wrapper>
      <Styled.Container ref={containerRef}>
        <Styled.PlayerWrapper ref={playerSizeRef}>
          <Styled.Player
            ref={videoRef}
            src={videoSrc}
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
