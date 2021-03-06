import { useRecoilValue } from 'recoil';

import { inputFilePathState } from '@renderer/recoil/atoms';

import { OptionContainer } from './OptionContainer';
import { StyledFileInputAssistText } from './Styled';
import { VideoPlayer } from './VideoPlayer';

export const Edit = () => {
  const filePath = useRecoilValue(inputFilePathState);

  return filePath ? (
    <>
      <VideoPlayer />
      <OptionContainer />
    </>
  ) : (
    <StyledFileInputAssistText>
      Drag and drop your video
    </StyledFileInputAssistText>
  );
};
