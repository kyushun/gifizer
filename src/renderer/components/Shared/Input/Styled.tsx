import styled from 'styled-components';

type StyledInputProps = {
  width?: number;
  backgroundColor: string;
  center?: boolean;
};

export const StyledInput = styled.input<StyledInputProps>`
  padding: 6px 12px;
  width: ${({ width }) => (width ? `${width}px` : '100%')};
  color: ${({ theme }) => theme.palette.textNormal};
  border: none;
  border-radius: 4px;
  background-color: ${({ backgroundColor }) => backgroundColor};
  text-align: ${({ center }) => (center ? 'center' : 'left')};

  &[type='number']::-webkit-inner-spin-button,
  &[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
  }

  &:focus {
    outline: 0;
  }
`;
