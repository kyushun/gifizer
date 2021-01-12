import styled from 'styled-components';

export const StyledContainer = styled.div<{ width: number }>`
  width: ${({ width }) => `${width}px`};
  height: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  -webkit-user-select: none;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  &:active {
    background-color: rgba(255, 255, 255, 0.25);
  }
`;

export const StyledMenuIcon = styled.figure`
  margin: 0;
  width: 22px;
  height: 22px;
  background-repeat: no-repeat;
  background-position: center;
`;

export const StyledMenuIconText = styled.div`
  font-size: 10px;
  color: ${({ theme }) => theme.palette.textNormal};
`;
