import { secToTimeString } from '@renderer/util';

import * as Styled from './Styled';

type Props = {
  currentTime: number;
  duration: number;
};

export const VideoTime = (props: Props) => {
  return (
    <Styled.Container>
      <div>{secToTimeString(props.currentTime)}</div>
      <div>{secToTimeString(props.duration)}</div>
    </Styled.Container>
  );
};
