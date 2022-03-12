import {
  BorderLeftFilled,
  BorderRightFilled,
  PauseFilled,
  PlayFilled,
} from '@fluentui/react-icons';

import { useVideoController } from '@hooks/index';

import { SeekBar } from './SeekBar';
import * as Styled from './Styled';
import { useSetOptionTime } from './use-set-option-time';
import { VideoControllerIconV2 } from './VideoControllerIcon';
import { VideoTime } from './VideoTime';

export const VideoController = () => {
  const { isPlaying, togglePlaying, duration, currentTime } =
    useVideoController();

  const { onBackwardClicked, onForwardClicked } = useSetOptionTime();

  return (
    <Styled.Container>
      <Styled.ButtonContainer>
        <VideoControllerIconV2
          FluentIcon={BorderRightFilled}
          onClick={onBackwardClicked}
        />
        <VideoControllerIconV2
          FluentIcon={isPlaying ? PauseFilled : PlayFilled}
          onClick={togglePlaying}
        />
        <VideoControllerIconV2
          FluentIcon={BorderLeftFilled}
          onClick={onForwardClicked}
        />
      </Styled.ButtonContainer>

      <VideoTime currentTime={currentTime} duration={duration} />

      <Styled.SeekBarWrapper>
        <SeekBar />
      </Styled.SeekBarWrapper>
    </Styled.Container>
  );
};
