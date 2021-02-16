/* eslint-disable jsx-a11y/media-has-caption */
import { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';

import { useVideoController } from '@hooks/index';

import { inputFilePathState } from '@recoil/atoms';

import { Crop } from './Crop';
import { StyledContainer, StyledVideoWrapper, StyledVideo } from './Styled';
import { VideoController } from './VideoController';

export const VideoPlayer = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const filePath = useRecoilValue(inputFilePathState);

  const { togglePlaying } = useVideoController(videoRef);

  useEffect(() => {
    const keyDown = (event: KeyboardEvent) => {
      if (!videoRef.current) return;

      const isTargetInput =
        /^(?:input|textarea|select|button)$/i.test(
          (event.target as HTMLElement).tagName
        ) && !(event.target as HTMLElement).classList.contains('allow-event');

      if (!isTargetInput) {
        if (event.code === 'Space') {
          togglePlaying();
        }

        if (event.code === 'ArrowRight') {
          if (event.ctrlKey || event.metaKey) {
            videoRef.current.currentTime += 2;
          } else if (event.shiftKey) {
            videoRef.current.currentTime += 10;
          } else {
            videoRef.current.currentTime += 5;
          }
        }

        if (event.code === 'ArrowLeft') {
          if (event.ctrlKey || event.metaKey) {
            videoRef.current.currentTime -= 2;
          } else if (event.shiftKey) {
            videoRef.current.currentTime -= 10;
          } else {
            videoRef.current.currentTime -= 5;
          }
        }
      }
    };
    document.addEventListener('keydown', keyDown);

    return () => {
      document.removeEventListener('keydown', keyDown);
    };
  }, [togglePlaying]);

  return (
    <StyledContainer>
      <StyledVideoWrapper>
        <StyledVideo
          ref={videoRef}
          src={filePath && `file:${filePath}`}
          preload="auto"
          onClick={togglePlaying}
        />
        <Crop />
      </StyledVideoWrapper>
      <VideoController videoRef={videoRef} />
    </StyledContainer>
  );
};
