import React from 'react';

export type ComponentProps<T> = T extends (_: infer P) => ReturnType<React.FC>
  ? P
  : never;
