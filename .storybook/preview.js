import { ThemeProvider } from 'styled-components';
import { theme } from '../src/renderer/components/Styles/theme';
import { GlobalStyles } from '../src/renderer/components/Styles/GlobalStyles';

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
}

export const decorators = [
  (Story) => (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Story />
    </ThemeProvider>
  ),
];
