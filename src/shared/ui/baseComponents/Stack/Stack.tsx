import React from 'react';

import clsx from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Stack = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={twMerge('flex flex-col flex-wrap', className)} {...props}>
      {children}
    </div>
  );
};
