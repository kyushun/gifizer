import { FluentIconsProps } from '@fluentui/react-icons';
import { FunctionComponent } from 'react';

import * as Styled from './Styled';

type Props = {
  width: number;
  text: string;
  FluentIcon: FunctionComponent<FluentIconsProps>;
};

export const MenuIcon = (props: Props) => {
  const { FluentIcon } = props;

  return (
    <Styled.Container width={props.width}>
      <FluentIcon fontSize={22} />
      <Styled.Text>{props.text}</Styled.Text>
    </Styled.Container>
  );
};
