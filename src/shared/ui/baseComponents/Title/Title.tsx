import React from 'react';

import clsx from 'clsx';

import styles from './Title.module.scss';

type TitleOrder = 1 | 2 | 3 | 4 | 5;

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  order?: TitleOrder;
  uppercase?: boolean;
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
  uppercase,
  ...props
}: TitleProps) => {
  const Component = titleComponents[order];

  return (
    <Component
      {...props}
      className={clsx(
        className,
        styles.title,
        styles[`titleH${order}`],
        uppercase && styles.uppercase,
      )}
    >
      {children}
    </Component>
  );
};
