import { ChangeEvent, useCallback } from 'react';

import { useVideoController } from '@hooks/index';

import * as Styled from './Styled';

export const SeekBar = () => {
  const { currentTime, duration, pause, seekTo } = useVideoController();

  const onMouseDown = useCallback(() => {
    pause();
  }, [pause]);

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
      onChange={onChange}
    />
  );
};
