'use client';

import React from 'react';

import clsx from 'clsx';

import CloseIcon from '@/shared/assets/icons/close.svg';

import ErrorIcon from './assets/icons/ErrorToast.svg';
import SuccessIcon from './assets/icons/SuccessToast.svg';
import { ToastType } from './const';
import styles from './Toast.module.scss';

type ToastProps = {
  message: string;
  description: string;
  type?: ToastType;
  actions?: React.ReactNode;
};

export const Toast: React.FC<ToastProps> = ({
  message,
  description,
  type = ToastType.Success,
  actions,
}) => {
  const Icon = type === ToastType.Success ? SuccessIcon : ErrorIcon;

  return (
    <div className={clsx(styles.toast, styles[type])}>
      <div className={styles.iconContainer}>
        <Icon />
      </div>
      <div className={styles.content}>
        <div className={styles.message}>{message}</div>
        <div className={styles.description}>{description}</div>
        {actions && <div className={styles.actions}>{actions}</div>}
      </div>
      <CloseIcon className={styles.closeIcon} />
    </div>
  );
};
