import React from 'react';

import clsx from 'clsx';

import styles from './Button.module.scss';
import { ButtonSize, ButtonView } from './const';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  view?: ButtonView;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
};

export const Button = ({
  children,
  view = ButtonView.Primary,
  size = ButtonSize.Medium,
  startIcon,
  endIcon,
  className,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.root, styles[view], styles[size], className)}
      {...props}
    >
      {startIcon && <div className={styles.iconContainer}>{startIcon}</div>}
      <span>{children}</span>
      {endIcon && <div className={styles.iconContainer}>{endIcon}</div>}
    </button>
  );
};
