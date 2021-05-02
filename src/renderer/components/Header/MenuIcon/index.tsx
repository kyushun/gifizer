import { Icon } from '@components/Shared/index';

import * as Styled from './Styled';

type Props = {
  width: number;
  icon: string;
  text: string;
};

export const MenuIcon = (props: Props) => (
  <Styled.Container width={props.width}>
    <Icon icon={props.icon} size={22} />
    <Styled.Text>{props.text}</Styled.Text>
  </Styled.Container>
);
