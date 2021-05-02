import { atom } from 'recoil';

import { ConvertStatus } from '@shared/types';

export const convertStatusState = atom<ConvertStatus | undefined>({
  key: 'convertStatusState',
  default: undefined,
});
