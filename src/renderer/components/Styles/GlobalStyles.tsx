import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  html, body {
    margin: 0;
    padding: 0;
  }

  body {
    position: relative;
    color: white;
    height: 100vh;
    font-family: 'SF Pro Text', 'Noto Sans JP', sans-serif;
    font-size: 12px;
    color: ${({ theme }) => theme.palette.textNormal};
    background-color: ${({ theme }) => theme.palette.mainSilent};
    overflow-y: hidden;
  }

  #root {
    width: 100%;
    height: 100%;
  }
`;
