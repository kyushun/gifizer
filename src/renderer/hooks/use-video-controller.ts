import { useCallback, useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

import { inputFilePathState, playerRefState } from '@recoil/atoms';

export const useVideoController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const filePath = useRecoilValue(inputFilePathState);
  const videoRef = useRecoilValue(playerRefState);

  const play = useCallback(() => {
    if (!videoRef.current) return;

    videoRef.current.play();
  }, [videoRef]);

  const pause = useCallback(() => {
    if (!videoRef.current) return;

    videoRef.current.pause();
  }, [videoRef]);

  const togglePlaying = useCallback(() => {
    if (!videoRef.current) return;

    if (isPlaying) {
      pause();
    } else {
      play();
    }
  }, [isPlaying, pause, play, videoRef]);

  const seekTo = useCallback(
    (time: number) => {
      if (!videoRef.current) return;

      setCurrentTime(time);

      // eslint-disable-next-line no-param-reassign
      videoRef.current.currentTime = time;
    },
    [videoRef]
  );

  useEffect(() => {
    setIsPlaying(false);

    const handleLoadedmetadata = () => {
      setDuration(videoRef.current?.duration || 0);

      const timeUpdate = () => {
        setCurrentTime(videoRef.current?.currentTime || 0);
        requestAnimationFrame(timeUpdate);
      };
      requestAnimationFrame(timeUpdate);
    };
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    videoRef.current?.addEventListener('loadedmetadata', handleLoadedmetadata);
    videoRef.current?.addEventListener('play', handlePlay);
    videoRef.current?.addEventListener('pause', handlePause);

    return () => {
      videoRef.current?.removeEventListener(
        'loadedmetadata',
        handleLoadedmetadata
      );
      videoRef.current?.removeEventListener('play', handlePlay);
      // eslint-disable-next-line react-hooks/exhaustive-deps
      videoRef.current?.removeEventListener('pause', handlePause);
    };
  }, [filePath, videoRef]);

  return {
    isPlaying,
    duration,
    currentTime,
    play,
    pause,
    togglePlaying,
    seekTo,
  };
};
