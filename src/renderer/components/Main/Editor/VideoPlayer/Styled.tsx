import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 40px;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  overflow: hidden;
`;

export const Container = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 100%;
  max-height: calc(100% - 60px);
`;

export const PlayerWrapper = styled.div`
  position: relative;
  will-change: width, height;
`;

export const Player = styled.video`
  width: 100%;
  height: 100%;
  border-radius: 6px;
`;
