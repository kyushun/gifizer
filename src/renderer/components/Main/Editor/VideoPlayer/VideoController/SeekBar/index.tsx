import { ChangeEvent, useCallback, useRef } from 'react';

import { useVideoController } from '@hooks/index';

import * as Styled from './Styled';

export const SeekBar = () => {
  const wasPlaying = useRef(false);

  const { isPlaying, currentTime, duration, play, pause, seekTo } =
    useVideoController();

  const onMouseDown = useCallback(() => {
    wasPlaying.current = isPlaying;
    pause();
  }, [isPlaying, pause]);

  const onMouseUp = useCallback(() => {
    wasPlaying.current && play();
  }, [play]);

  const onChange = useCallback(
    ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
      seekTo(parseFloat(value));
    },
    [seekTo]
  );

  return (
    <Styled.Input
      className="allow-event"
      type="range"
      step="any"
      max={duration}
      value={currentTime}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      onChange={onChange}
    />
  );
};
