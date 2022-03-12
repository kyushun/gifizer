import styled from 'styled-components';

export const Input = styled.input<{
  width?: number;
  backgroundColor: string;
  center?: boolean;
}>`
  padding: 6px 12px;
  width: ${({ width }) => (width ? `${width}px` : 'calc(100% - 24px)')};
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
