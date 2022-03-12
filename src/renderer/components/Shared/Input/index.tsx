import { ComponentProps } from 'react';

import * as Styled from './Styled';

type Props = {
  type?: 'text' | 'number';
  value?: string | number;
  width?: number;
  backgroundColor: string;
  placeholder?: string;
  center?: boolean;
  onChange?: ComponentProps<'input'>['onChange'];
  onBlur?: ComponentProps<'input'>['onBlur'];
  disabled?: boolean;
};

export const Input = (props: Props) => {
  return (
    <Styled.Input
      type={props.type || 'text'}
      value={props.value}
      width={props.width}
      backgroundColor={props.backgroundColor}
      center={props.center}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onBlur={props.onBlur}
      disabled={props.disabled}
    />
  );
};
