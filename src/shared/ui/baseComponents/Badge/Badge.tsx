import React from 'react';

import clsx from 'clsx';

import { Typography } from '@/shared/ui';

interface BadgeProps
  extends Pick<
    React.HTMLAttributes<HTMLDivElement>,
    'className' | 'children'
  > {}

export const Badge = ({ children, className }: BadgeProps) => {
  return (
    <div
      className={clsx(
        'bg-white flex px-[3px] items-center text-black w-fit h-[17px]',
        className,
      )}
    >
      <Typography order={3}>{children}</Typography>
    </div>
  );
};
