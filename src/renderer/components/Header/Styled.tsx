import styled from 'styled-components';

import { isDarwin } from '@shared/util';

export const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 52px;
  background-color: ${({ theme }) => theme.palette.mainAccent};
  user-select: none;
  -webkit-app-region: ${isDarwin ? 'drag' : undefined};
`;

export const AppName = styled.div`
  font-weight: bold;
  font-size: 14px;
  line-height: 18px;
  color: ${({ theme }) => theme.palette.textNormal};
`;

export const IconWrapper = styled.div<{
  left?: number;
  right?: number;
}>`
  position: absolute;
  top: 50%;
  left: ${({ left }) => left && `${left}px`};
  right: ${({ right }) => right && `${right}px`};
  transform: translateY(-50%);
`;
