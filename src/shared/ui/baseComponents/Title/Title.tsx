'use client';

import React from 'react';

import clsx from 'clsx';

import { useMatches, UseMatchesInput } from '@/shared/lib';

import styles from './Title.module.scss';

type TitleOrder = 1 | 2 | 3 | 4 | 5;
type ResponsiveTitleOrder = TitleOrder | UseMatchesInput<TitleOrder>;

type Uppercase = boolean;
type ResponsiveUppercase = Uppercase | UseMatchesInput<Uppercase>;

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  order?: ResponsiveTitleOrder;
  uppercase?: ResponsiveUppercase;
}

const titleComponents: Record<TitleOrder, React.ElementType> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
};

export const Title = ({
  order = 1,
  children,
  className,
  uppercase = false,
  ...props
}: TitleProps) => {
  const responsiveOrder = useMatches(
    typeof order === 'number' ? { base: order } : order,
  );

  const responsiveUppercase = useMatches(
    typeof uppercase === 'boolean' ? { base: uppercase } : { ...uppercase },
  );

  const Component = titleComponents[responsiveOrder];

  return (
    <Component
      {...props}
      className={clsx(
        className,
        styles.title,
        styles[`titleH${responsiveOrder}`],
        responsiveUppercase && styles.uppercase,
      )}
    >
      {children}
    </Component>
  );
};
