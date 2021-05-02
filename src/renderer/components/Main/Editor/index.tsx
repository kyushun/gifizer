import { useRecoilValue } from 'recoil';

import { inputFilePathState } from '@renderer/recoil/atoms';

import { OptionSetter } from './OptionSetter';
import * as Styled from './Styled';
import { VideoPlayer } from './VideoPlayer';

export const Editor = () => {
  const filePath = useRecoilValue(inputFilePathState);

  if (!filePath) {
    return <Styled.HelperText>Drag and drop your video</Styled.HelperText>;
  }

  return (
    <>
      <VideoPlayer />
      <OptionSetter />
    </>
  );
};
