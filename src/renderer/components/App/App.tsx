import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { AppContent } from './AppContent';
import { StyledApp } from './Styled';
import { Header } from '@components/Header';
import { GlobalStyles } from '@renderer/components/Styles/GlobalStyles';
import { theme } from '@renderer/components/Styles/theme';
import { isDevelopment } from '@shared/util';

const RecoilizeDebugger = isDevelopment
  ? require('recoilize').default
  : () => null;

export const App = () => (
  <RecoilRoot>
    <RecoilizeDebugger />
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <StyledApp>
        <Header />
        <AppContent />
      </StyledApp>
    </ThemeProvider>
  </RecoilRoot>
);
