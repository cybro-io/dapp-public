import React from 'react';

import { Spinner } from '@nextui-org/react';
import clsx from 'clsx';

import styles from './Button.module.scss';
import { ButtonSize, ButtonView } from './const';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  view?: ButtonView;
  size?: ButtonSize;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isLoading?: boolean;
};

const SpinnerSize: Record<ButtonSize, string> = {
  [ButtonSize.Small]: '!size-4',
  [ButtonSize.Medium]: '!size-5',
  [ButtonSize.Large]: '!size-6',
};

export const Button = ({
  children,
  view = ButtonView.Primary,
  size = ButtonSize.Medium,
  startIcon,
  endIcon,
  className,
  isLoading,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={clsx(styles.root, styles[view], styles[size], className)}
      {...props}
    >
      {isLoading && (
        <div className={styles.iconContainer}>
          <Spinner
            color="default"
            classNames={{ wrapper: SpinnerSize[size] }}
          />
        </div>
      )}

      {!isLoading && startIcon && (
        <div className={styles.iconContainer}>{startIcon}</div>
      )}
      <span>{children}</span>
      {endIcon && <div className={styles.iconContainer}>{endIcon}</div>}
    </button>
  );
};
