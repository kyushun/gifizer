import { contextBridgeApis } from '@main/preload';

type ContextBridgeApis = typeof contextBridgeApis;

declare global {
  interface Window extends ContextBridgeApis {}
}

export {};
