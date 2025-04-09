import React from 'react';

import { theme } from '../../../tailwind.config';

export type ComponentWithProps<T> = React.FC<
  T & {
    className?: string;
  }
>;

export type PropsWithClassName<T = unknown> = T & {
  className?: string;
};

export type Nullable<T> = T | null | undefined;

export type Maybe<T> = T | undefined;

export type TailwindBreakpoint = keyof typeof theme.screens;
export type BreakpointsValues = Record<
  TailwindBreakpoint | (string & {}),
  string
>;

export type Breakpoint = keyof BreakpointsValues;
