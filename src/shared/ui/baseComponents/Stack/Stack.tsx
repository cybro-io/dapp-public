import React from 'react';

import { twMerge } from 'tailwind-merge';

export const Stack = React.forwardRef(
  (
    { children, className, ...props }: React.HTMLAttributes<HTMLDivElement>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div
        ref={ref}
        className={twMerge('flex flex-col flex-wrap', className)}
        {...props}
      >
        {children}
      </div>
    );
  },
);
