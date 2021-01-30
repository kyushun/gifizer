import path from 'path';

import { apiContextBridge } from '@main/preload';

declare global {
  interface Window {
    process: any;
    path: typeof path;
    api: typeof apiContextBridge;
  }
}

export {};
