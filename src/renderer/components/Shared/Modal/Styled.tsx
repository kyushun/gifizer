import styled from 'styled-components';

export const Container = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 52px;
  left: 0;
  width: 100%;
  height: calc(100% - 52px);
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${({ isVisible: visible }) => (visible ? '1' : '0')};
  backdrop-filter: ${({ theme }) => theme.palette.backdropBlur};
  transition: opacity 0.2s;
  z-index: 99;
  pointer-events: none;
`;
