import { RefObject } from 'react';
import { atom } from 'recoil';

export const playerRefState = atom<RefObject<HTMLVideoElement>>({
  key: 'playerRefState',
  default: { current: null },
});
