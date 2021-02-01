import { Icon } from '@components/Shared';

import { StyledIconWrapper } from './Styled';

type ControllerIconProps = {
  icon: string;
  onClick: () => void;
};

export const VideoControllerIcon = (props: ControllerIconProps) => (
  <StyledIconWrapper onClick={props.onClick}>
    <Icon icon={props.icon} size={16} />
  </StyledIconWrapper>
);
