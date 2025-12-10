import React from 'react';

import clsx from 'clsx';

export const Group = React.forwardRef(
  (
    { children, className, ...restProps }: React.HTMLAttributes<HTMLDivElement>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div
        ref={ref}
        className={clsx('flex flex-row flex-wrap', className)}
        {...restProps}
      >
        {children}
      </div>
    );
  },
);
