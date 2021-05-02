import { FC } from 'react';

export type ComponentProps<T> = T extends (_: infer P) => ReturnType<FC>
  ? P
  : never;
