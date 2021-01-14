import styled from 'styled-components';

export const StyledHeaderWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 52px;
  background-color: ${({ theme }) => theme.palette.mainAccent};
  -webkit-user-select: none;
  -webkit-app-region: drag;
`;

export const StyledHeaderAppName = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.palette.textNormal};
`;

export const StyledMenuIconWrapper = styled.div<{
  left?: number;
  right?: number;
}>`
  position: absolute;
  top: 50%;
  left: ${({ left }) => left && `${left}px`};
  right: ${({ right }) => right && `${right}px`};
  transform: translateY(-50%);
`;