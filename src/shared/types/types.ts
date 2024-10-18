import React from 'react';

export type ComponentWithProps<T> = React.FC<
  T & {
    className?: string;
  }
>;

export type Nullable<T> = T | null | undefined;

export type Maybe<T> = T | undefined;
