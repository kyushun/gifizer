import { atom } from 'recoil';

export type AppStatus = 'INPUT' | 'INSPECT' | 'EDIT' | 'CONVERT';
export const appStatusState = atom<AppStatus>({
  key: 'appStatusState',
  default: 'INPUT',
});
