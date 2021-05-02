import log from 'electron-log';
import path from 'path';

import { apiContextBridge } from '@main/preload';

declare global {
  interface Window {
    process: any;
    path: typeof path;
    log: typeof log.functions;
    api: typeof apiContextBridge;
  }
}

export {};
