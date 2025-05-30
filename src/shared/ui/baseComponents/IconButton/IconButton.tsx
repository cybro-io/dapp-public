import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

import styles from './IconButton.module.scss';

export type IconButtonProps = {
  icon: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const IconButton: ComponentWithProps<IconButtonProps> = ({
  onClick,
  icon,
  className,
  ...props
}) => {
  return (
    <button
      onClick={onClick}
      className={clsx(styles.root, className)}
      {...props}
    >
      {icon}
    </button>
  );
};
