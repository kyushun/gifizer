import { useVideoController } from '@hooks/index';

import backwardIconSvg from './backward-icon.svg';
import forwardIconSvg from './forward-icon.svg';
import pauseIconSvg from './pause-icon.svg';
import playIconSvg from './play-icon.svg';
import { SeekBar } from './SeekBar';
import * as Styled from './Styled';
import { useSetOptionTime } from './use-set-option-time';
import { VideoControllerIcon } from './VideoControllerIcon';
import { VideoTime } from './VideoTime';

export const VideoController = () => {
  const {
    isPlaying,
    togglePlaying,
    duration,
    currentTime,
  } = useVideoController();

  const { onBackwardClicked, onForwardClicked } = useSetOptionTime();

  return (
    <Styled.Container>
      <Styled.ButtonContainer>
        <VideoControllerIcon
          icon={backwardIconSvg}
          onClick={onBackwardClicked}
        />
        <VideoControllerIcon
          icon={isPlaying ? pauseIconSvg : playIconSvg}
          onClick={togglePlaying}
        />
        <VideoControllerIcon icon={forwardIconSvg} onClick={onForwardClicked} />
      </Styled.ButtonContainer>

      <VideoTime currentTime={currentTime} duration={duration} />

      <Styled.SeekBarWrapper>
        <SeekBar />
      </Styled.SeekBarWrapper>
    </Styled.Container>
  );
};
