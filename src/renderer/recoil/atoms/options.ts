import { atomFamily, selectorFamily } from 'recoil';

type StringOptions = 'option/filename';

export const stringOptionStateFamily = atomFamily<string, StringOptions>({
  key: 'option/string-options',
  default: '',
});

type numberOptions =
  | 'option/width'
  | 'option/height'
  | 'option/fps'
  | 'option/startTime'
  | 'option/endTime';

export const numberOptionStateFamily = atomFamily<
  number | undefined,
  numberOptions
>({
  key: 'option/number-options',
  default: undefined,
});

export const intOptionsStateFamilyString = selectorFamily<
  string,
  numberOptions
>({
  key: 'option/int-options-string',
  get: (arg) => ({ get }) =>
    get(numberOptionStateFamily(arg))?.toString() || '',
  set: (arg) => ({ set }, newValue) =>
    set(
      numberOptionStateFamily(arg),
      parseInt(newValue as string, 10) || undefined
    ),
});

export const floatOptionsStateFamilyString = selectorFamily<
  string,
  numberOptions
>({
  key: 'option/float-options-string',
  get: (arg) => ({ get }) =>
    get(numberOptionStateFamily(arg))?.toString() || '',
  set: (arg) => ({ set }, newValue) =>
    set(
      numberOptionStateFamily(arg),
      parseFloat(newValue as string) || undefined
    ),
});

type boolOptions = 'option/palette';

const DefaultboolOptionsValue: {
  [key in boolOptions]: boolean;
} = {
  'option/palette': true,
};

export const boolOptionsStateFamily = atomFamily<boolean, boolOptions>({
  key: 'option/bool-options',
  default: (param) => DefaultboolOptionsValue[param],
});
