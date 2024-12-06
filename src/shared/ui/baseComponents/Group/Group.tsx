import React from 'react';

import clsx from 'clsx';

export const Group = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={clsx('flex flex-row flex-wrap', className)}>{children}</div>
  );
};
