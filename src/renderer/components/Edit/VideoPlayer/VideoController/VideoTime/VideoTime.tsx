import { secToTimeString } from '@renderer/util';

import { StyledVideoTimeWrapper } from './Styled';

type Props = {
  currentTime: number;
  duration: number;
};

export const VideoTime = (props: Props) => {
  return (
    <StyledVideoTimeWrapper>
      <div>{secToTimeString(props.currentTime)}</div>
      <div>{secToTimeString(props.duration)}</div>
    </StyledVideoTimeWrapper>
  );
};
