/// <reference types="styled-components/cssprop" />

import 'styled-components';
import { theme } from '@renderer/components/Styles/theme';

type Theme = typeof theme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
