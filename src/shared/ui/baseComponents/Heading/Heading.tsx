import React from 'react';

import clsx from 'clsx';

import { TextView, Text } from '@/shared/ui';

type HeadingProps = React.PropsWithChildren & {
  isYellow?: boolean;
};

export const Heading = ({ children, isYellow }: HeadingProps) => {
  return (
    <div
      className={clsx(
        'rounded-[7px] backdrop-blur-[52px] px-1.5 py-0.5 w-fit',
        'bg-[linear-gradient(148deg,rgba(255,255,255,0.10)_3.15%,rgba(107,109,121,0.07)_96.78%)]',
      )}
    >
      <Text
        textView={TextView.H3}
        className={
          isYellow ? '!text-text-accent-logoYellow' : '!text-text-white-heading'
        }
      >
        {children}
      </Text>
    </div>
  );
};
