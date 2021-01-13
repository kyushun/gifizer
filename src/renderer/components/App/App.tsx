import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { OptionContainer } from './OptionContainer';
import { PlayerContainer } from './PlayerContainer';
import { StyledApp, StyledContent } from './Styled';
import { Header } from '@components/Header';
import { GlobalStyles } from '@renderer/components/Styles/GlobalStyles';
import { theme } from '@renderer/components/Styles/theme';
import { isDevelopment } from '@shared/util';

const RecoilizeDebugger = isDevelopment
  ? require('recoilize').default
  : () => null;

export const App = () => {
  return (
    <RecoilRoot>
      <RecoilizeDebugger />
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <StyledApp>
          <Header />
          <StyledContent>
            <PlayerContainer />
            <OptionContainer />
          </StyledContent>
        </StyledApp>
      </ThemeProvider>
    </RecoilRoot>
  );
};
