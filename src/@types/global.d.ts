import { apiContextBridge } from '@main/preload';

declare global {
  interface Window {
    process: any;
    path: any;
    api: typeof apiContextBridge;
  }
}

export {};
