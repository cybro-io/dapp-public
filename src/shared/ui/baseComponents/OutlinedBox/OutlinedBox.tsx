import React from 'react';

import clsx from 'clsx';

export const OutlinedBox = ({
  children,
  className,
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={clsx(
        'rounded-[20px] border border-stroke-tableBorder',
        className,
      )}
    >
      {children}
    </div>
  );
};

const Divider = () => {
  return <div className="w-full h-px bg-stroke-tableBorder" />;
};

OutlinedBox.Divider = Divider;
