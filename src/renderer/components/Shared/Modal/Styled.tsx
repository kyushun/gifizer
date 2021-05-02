import styled from 'styled-components';

import { isDarwin } from '@shared/util';

export const Container = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: ${isDarwin ? '52px' : '82px'};
  left: 0;
  width: 100%;
  height: calc(100% - ${isDarwin ? '52px' : '82px'});
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${({ isVisible: visible }) => (visible ? '1' : '0')};
  backdrop-filter: ${({ theme }) => theme.palette.backdropBlur};
  transition: opacity 0.2s;
  z-index: 99;
  pointer-events: none;
`;
