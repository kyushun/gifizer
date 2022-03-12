import { FluentIconsProps } from '@fluentui/react-icons';
import { FunctionComponent } from 'react';

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

type Props = {
  FluentIcon: FunctionComponent<FluentIconsProps>;
  onClick: () => void;
};

export const VideoControllerIconV2 = (props: Props) => {
  const { FluentIcon } = props;
  return (
    <Styled.Container onClick={props.onClick}>
      <FluentIcon fontSize={20} style={{ verticalAlign: 'middle' }} />
    </Styled.Container>
  );
};
