import styled from 'styled-components';

export const StyledTitleBarWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0 0 15px;
  width: 100%;
  height: 30px;
  background-color: ${({ theme }) => theme.palette.mainNormal};
  box-sizing: border-box;
  -webkit-app-region: drag;
`;

export const StyledTitleBarText = styled.div`
  font-size: 11px;
`;

export const StyledTitleBarControllWrapper = styled.div`
  display: flex;
  height: 100%;
  -webkit-app-region: none;
`;

export const StyledTitleBarControllIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  height: 100%;

  &:hover {
    background-color: ${({ theme }) => theme.palette.hover};
  }
`;

export const StyledTitleBarControllCloseIcon = styled(
  StyledTitleBarControllIcon
)`
  &:hover {
    background-color: #d61424;
  }
`;
