'use client';

import React from 'react';

import { Text, TextView } from '@/shared/ui';

import { SwapTokenCardProps } from './SwapTokenCard';

export const Title = ({ title }: Pick<SwapTokenCardProps, 'title'>) => {
  if (!title) {
    return null;
  }

  return (
    <Text textView={TextView.C4} className="opacity-70">
      {title}
    </Text>
  );
};
