import styled from 'styled-components';

export const StyledContainer = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  user-select: none;
  -webkit-app-region: none;

  &:hover {
    background-color: ${({ theme }) => theme.palette.hover};
  }

  &:active {
    background-color: ${({ theme }) => theme.palette.active};
  }
`;

export const StyledMenuIconText = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.palette.textNormal};
`;
