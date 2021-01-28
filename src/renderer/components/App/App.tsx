import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';

import { AppContainer } from '@components/AppContainer';
import { Header } from '@components/Header';
import { GlobalStyles } from '@components/Styles/GlobalStyles';
import { theme } from '@components/Styles/theme';

import { StyledApp } from './Styled';

export const App = () => (
  <RecoilRoot>
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledApp>
        <Header />
        <AppContainer />
      </StyledApp>
    </ThemeProvider>
  </RecoilRoot>
);
