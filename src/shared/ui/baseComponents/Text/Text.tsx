import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

import { TextView } from './const';
import styles from './Text.module.scss';

type TextProps = {
  children: React.ReactNode;
  textView?: TextView;
};

export const Text: ComponentWithProps<TextProps> = ({
  children,
  textView = TextView.P1,
  className,
}) => {
  switch (textView) {
    case TextView.H1:
      return (
        <h1 className={clsx(styles.h1, styles.root, className)}>{children}</h1>
      );
    case TextView.H2:
      return (
        <h2 className={clsx(styles.h2, styles.root, className)}>{children}</h2>
      );
    case TextView.H3:
      return (
        <h3 className={clsx(styles.h3, styles.root, className)}>{children}</h3>
      );
    case TextView.H4:
      return (
        <h4 className={clsx(styles.h4, styles.root, className)}>{children}</h4>
      );
    case TextView.H5:
      return (
        <h5 className={clsx(styles.h5, styles.root, className)}>{children}</h5>
      );
    case TextView.BP1:
    case TextView.BP2:
    case TextView.BP3:
    case TextView.BU1:
    case TextView.BU2:
    case TextView.BU3:
      return (
        <span className={clsx(styles[textView], styles.root, className)}>
          {children}
        </span>
      );
    default:
      return (
        <span className={clsx(styles[textView], styles.root, className)}>
          {children}
        </span>
      );
  }
};
