import { ContextBridgeApis } from '@main/preload';

declare global {
  interface Window extends ContextBridgeApis {}
}

export {};
