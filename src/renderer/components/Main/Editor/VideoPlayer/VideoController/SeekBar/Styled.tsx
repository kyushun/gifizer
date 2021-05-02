import styled from 'styled-components';

export const Input = styled.input`
  padding-bottom: 2px;
  width: 100%;
  height: 18px;
  background-color: transparent;
  outline: none;
  border-radius: 6px;
  appearance: none;
  cursor: pointer;

  &::-webkit-slider-thumb {
    margin-top: -6px;
    width: 3px;
    height: 18px;
    background-color: ${({ theme }) => theme.palette.textNormal};
    border-radius: 18px;
    appearance: none;
  }

  &::-webkit-slider-runnable-track {
    height: 6px;
    background-color: ${({ theme }) => theme.palette.textHide};
    border-radius: 6px;
  }
`;
