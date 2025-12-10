'use client';

import React from 'react';

import clsx from 'clsx';

import IconWarning from '@/shared/assets/icons/icon-warning.svg';
import { ComponentWithProps } from '@/shared/types';
import { ChipSize, ChipViewType } from '@/shared/ui';

import styles from './Chip.module.scss';

type ChipProps = {
  children: React.ReactNode;
  size?: ChipSize;
  viewType?: ChipViewType;
};

export const Chip: ComponentWithProps<ChipProps> = ({
  size = ChipSize.Medium,
  viewType = ChipViewType.Default,
  children,
  className,
}) => {
  return (
    <div
      className={clsx(styles.root, styles[size], styles[viewType], className)}
    >
      {viewType === ChipViewType.Warning && <IconWarning />}
      {children}
    </div>
  );
};
