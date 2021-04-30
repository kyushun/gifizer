import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { Main } from '@renderer/components/Main';

import { Header } from '@components/Header';
import { GlobalStyles } from '@components/Styles/GlobalStyles';
import { theme } from '@components/Styles/theme';

import * as Styled from './Styled';

export const App = () => (
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Styled.AppWrapper>
        <Header />
        <Main />
      </Styled.AppWrapper>
    </ThemeProvider>
  </RecoilRoot>
);
