import { ChangeEvent, RefObject, useCallback } from 'react';

import { useVideoController } from '@hooks/index';

import { StyledInput } from './Styled';

type Props = {
  videoRef: RefObject<HTMLVideoElement>;
};

export const SeekBar = (props: Props) => {
  const { currentTime, duration, pause, seekTo } = useVideoController(
    props.videoRef
  );

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
    <StyledInput
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
