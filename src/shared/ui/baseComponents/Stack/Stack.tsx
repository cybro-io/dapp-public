import React from 'react';

import clsx from 'clsx';

export const Stack = ({
  children,
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={clsx('flex flex-col flex-wrap', className)} {...props}>
      {children}
    </div>
  );
};
