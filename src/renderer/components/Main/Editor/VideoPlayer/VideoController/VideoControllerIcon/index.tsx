import { Icon } from '@components/Shared';

import * as Styled from './Styled';

type ControllerIconProps = {
  icon: string;
  onClick: () => void;
};

export const VideoControllerIcon = (props: ControllerIconProps) => (
  <Styled.Container onClick={props.onClick}>
    <Icon icon={props.icon} size={16} />
  </Styled.Container>
);
