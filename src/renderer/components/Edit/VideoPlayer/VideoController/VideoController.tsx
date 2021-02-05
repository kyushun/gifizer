import { RefObject, useCallback } from 'react';
import { useSetRecoilState } from 'recoil';

import { useVideoController } from '@hooks/index';

import { numberOptionStateFamily } from '@recoil/atoms/index';

import backwardIconSvg from './backward-icon.svg';
import forwardIconSvg from './forward-icon.svg';
import pauseIconSvg from './pause-icon.svg';
import playIconSvg from './play-icon.svg';
import { SeekBar } from './SeekBar';
import {
  StyledVideoControllerWrapper,
  StyledVideoControllerButtons,
  StyledSeekBarWrapper,
} from './Styled';
import { VideoControllerIcon } from './VideoControllerIcon';
import { VideoTime } from './VideoTime';

type Props = {
  videoRef: RefObject<HTMLVideoElement>;
};

export const VideoController = (props: Props) => {
  const {
    isPlaying,
    togglePlaying,
    duration,
    currentTime,
  } = useVideoController(props.videoRef);

  const setStartTime = useSetRecoilState(
    numberOptionStateFamily('option/startTime')
  );
  const setEndTime = useSetRecoilState(
    numberOptionStateFamily('option/endTime')
  );

  const onBackwardClicked = useCallback(() => {
    setStartTime(currentTime);
  }, [currentTime, setStartTime]);

  const onForwardClicked = useCallback(() => {
    setEndTime(currentTime);
  }, [currentTime, setEndTime]);

  return (
    <StyledVideoControllerWrapper>
      <StyledVideoControllerButtons>
        <VideoControllerIcon
          icon={backwardIconSvg}
          onClick={onBackwardClicked}
        />
        <VideoControllerIcon
          icon={isPlaying ? pauseIconSvg : playIconSvg}
          onClick={togglePlaying}
        />
        <VideoControllerIcon icon={forwardIconSvg} onClick={onForwardClicked} />
      </StyledVideoControllerButtons>
      <VideoTime currentTime={currentTime} duration={duration} />
      <StyledSeekBarWrapper>
        <SeekBar videoRef={props.videoRef} />
      </StyledSeekBarWrapper>
    </StyledVideoControllerWrapper>
  );
};
