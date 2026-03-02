import React from 'react';

import { Spinner } from '@heroui/react';
import clsx from 'clsx';

import { useMatches, UseMatchesInput } from '@/shared/lib';

import styles from './Button.module.scss';
import { ButtonSize, ButtonView } from './const';

type ResponsiveButtonSizeType = ButtonSize | UseMatchesInput<ButtonSize>;

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  view?: ButtonView;
  size?: ResponsiveButtonSizeType;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  isLoading?: boolean;
};

const SpinnerSize: Record<ButtonSize, string> = {
  [ButtonSize.Small]: '!size-4',
  [ButtonSize.Medium]: '!size-5',
  [ButtonSize.Large]: '!size-6',
};

export const Button = React.forwardRef(
  (
    {
      children,
      view = ButtonView.Primary,
      size = ButtonSize.Medium,
      startIcon,
      endIcon,
      className,
      isLoading,
      ...props
    }: ButtonProps,
    ref: React.ForwardedRef<HTMLButtonElement>,
  ) => {
    const responsiveSize = useMatches(
      typeof size === 'string' ? { base: size } : size,
    );

    return (
      <button
        ref={ref}
        className={clsx(
          styles.root,
          styles[view],
          styles[responsiveSize],
          className,
        )}
        {...props}
      >
        {isLoading && (
          <div className={styles.iconContainer}>
            <Spinner
              color="default"
              classNames={{ wrapper: SpinnerSize[responsiveSize] }}
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
  },
);
