import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { OptionContainer } from './OptionContainer';
import { PlayerContainer } from './PlayerContainer';
import { StyledApp, StyledContent } from './Styled';
import { Header } from '@components/Header';
import { GlobalStyles } from '@renderer/components/Styles/GlobalStyles';
import { theme } from '@renderer/components/Styles/theme';

export const App = () => (
  <RecoilRoot>
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
