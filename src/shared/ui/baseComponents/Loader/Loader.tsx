import React from 'react';

import { Spinner } from '@heroui/react';

import { ComponentWithProps } from '@/shared/types';

type LoaderProps = {};

export const Loader: ComponentWithProps<LoaderProps> = ({ className }) => {
  return (
    <Spinner
      className={className}
      color="white"
      classNames={{
        wrapper: '!size-[72px]',
        circle1: 'text-white !border-[10px]',
        circle2: 'text-white !border-[10px]',
      }}
    />
  );
};
