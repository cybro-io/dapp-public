import React from 'react';

import clsx from 'clsx';

import { Title } from '@/shared/ui';

type HeadingProps = React.HTMLAttributes<HTMLDivElement> & {
  isYellow?: boolean;
};

export const Heading = ({
  children,
  isYellow,
  className,
  ...props
}: HeadingProps) => {
  return (
    <div
      className={clsx(
        'rounded-[7px] backdrop-blur-[52px] px-1.5 py-0.5 w-fit',
        'bg-[linear-gradient(148deg,rgba(255,255,255,0.10)_3.15%,rgba(107,109,121,0.07)_96.78%)]',
        className,
      )}
      {...props}
    >
      <Title
        order={3}
        uppercase
        className={
          isYellow ? 'text-text-accent-logoYellow' : 'text-text-white-heading'
        }
      >
        {children}
      </Title>
    </div>
  );
};
