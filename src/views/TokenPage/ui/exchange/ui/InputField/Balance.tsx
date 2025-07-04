'use client';

import React from 'react';

import { Typography } from '@/shared/ui';
import { formatNumber } from '@/shared/utils';

export const Balance = ({ children }: React.PropsWithChildren) => {
  if (!children) {
    return null;
  }

  if (typeof children !== 'string') {
    return children;
  }

  return (
    <div className="inline-flex gap-[5px]">
      <Typography order={4} variant="caption" className="opacity-70">
        Balance
      </Typography>
      <Typography order={4} variant="caption">
        {formatNumber(children)}
      </Typography>
    </div>
  );
};
