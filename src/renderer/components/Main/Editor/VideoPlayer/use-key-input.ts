/* eslint-disable no-param-reassign */
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import { playerRefState } from '@renderer/recoil/atoms';

import { useVideoController } from '@hooks/use-video-controller';

export const useKeyInput = () => {
  const videoRef = useRecoilValue(playerRefState);
  const { togglePlaying } = useVideoController();

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
  }, [togglePlaying, videoRef]);
};
