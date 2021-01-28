import { atom } from 'recoil';

import { InspectData } from '@shared/types';

export const inputFilePathState = atom({
  key: 'inputFilePathState',
  default: '',
});

export const inputFileInfoState = atom<InspectData | undefined>({
  key: 'inputFileInfoState',
  default: undefined,
});
