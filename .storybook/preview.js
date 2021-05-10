import path from 'path';
import { RecoilRoot } from 'recoil';

import { ThemeProvider } from 'styled-components';
import { theme } from '../src/renderer/components/Styles/theme';
import { GlobalStyles } from '../src/renderer/components/Styles/GlobalStyles';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

window.path = path;

export const decorators = [
  (Story) => (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Story />
      </ThemeProvider>
    </RecoilRoot>
  ),
];
