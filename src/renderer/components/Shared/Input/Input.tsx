import { ChangeEvent } from 'react';

import { StyledInput } from './Styled';

type Props = {
  type?: 'text' | 'number';
  value?: string | number;
  width?: number;
  backgroundColor: string;
  placeholder?: string;
  center?: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
    />
  );
};
