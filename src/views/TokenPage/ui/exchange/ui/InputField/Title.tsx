'use client';

import React from 'react';

import { Typography } from '@/shared/ui';

import { InputFieldProps } from './InputField';

export const Title = ({ title }: Pick<InputFieldProps, 'title'>) => {
  if (!title) {
    return null;
  }

  return (
    <Typography order={4} variant="caption" className="opacity-70">
      {title}
    </Typography>
  );
};
