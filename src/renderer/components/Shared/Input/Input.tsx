import { ComponentProps } from 'react';

import { StyledInput } from './Styled';

type Props = {
  type?: 'text' | 'number';
  value?: string | number;
  width?: number;
  backgroundColor: string;
  placeholder?: string;
  center?: boolean;
  onChange?: ComponentProps<'input'>['onChange'];
  onBlur?: ComponentProps<'input'>['onBlur'];
};

export const Input = (props: Props) => {
  return (
    <StyledInput
      type={props.type || 'text'}
      value={props.value}
      width={props.width}
      backgroundColor={props.backgroundColor}
      center={props.center}
      placeholder={props.placeholder}
      onChange={props.onChange}
      onBlur={props.onBlur}
    />
  );
};
