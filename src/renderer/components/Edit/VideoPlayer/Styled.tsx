import styled from 'styled-components';

export const StyledContainer = styled.div`
  padding: 40px;
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;

export const StyledVideo = styled.video`
  max-width: 100%;
  max-height: calc(100% - 60px);
  border-radius: 6px;
`;
