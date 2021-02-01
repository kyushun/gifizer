import { RefObject } from 'react';

import { useVideoController } from '@hooks/index';

import pauseIconSvg from './pause-icon.svg';
import playIconSvg from './play-icon.svg';
import { SeekBar } from './SeekBar';
import {
  StyledVideoControllerWrapper,
  StyledVideoControllerButtons,
  StyledSeekBarWrapper,
} from './Styled';
import { VideoControllerIcon } from './VideoControllerIcon';

type Props = {
  videoRef: RefObject<HTMLVideoElement>;
};

export const VideoController = (props: Props) => {
  const { isPlaying, togglePlaying } = useVideoController(props.videoRef);

  return (
    <StyledVideoControllerWrapper>
      <StyledVideoControllerButtons>
        <VideoControllerIcon
          icon={isPlaying ? pauseIconSvg : playIconSvg}
          onClick={togglePlaying}
        />
      </StyledVideoControllerButtons>
      <StyledSeekBarWrapper>
        <SeekBar videoRef={props.videoRef} />
      </StyledSeekBarWrapper>
    </StyledVideoControllerWrapper>
  );
};
