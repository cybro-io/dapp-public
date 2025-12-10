import React, { HTMLAttributes } from 'react';

import clsx from 'clsx';

export const Card = ({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      {...props}
      className={clsx(
        'bg-background-chips/50 w-full h-fit overflow-hidden rounded-lg',
        className,
      )}
    >
      {children}
    </div>
  );
};

const Content = React.forwardRef(
  (
    { children, className, ...props }: HTMLAttributes<HTMLDivElement>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div
        ref={ref}
        {...props}
        className={clsx('p-6 bg-background-chips h-full', className)}
      >
        {children}
      </div>
    );
  },
);

const Header = React.forwardRef(
  (
    { children, className, ...props }: HTMLAttributes<HTMLDivElement>,
    ref: React.ForwardedRef<HTMLDivElement>,
  ) => {
    return (
      <div ref={ref} {...props} className={clsx('p-6', className)}>
        {children}
      </div>
    );
  },
);

Card.Header = Header;
Card.Content = Content;
