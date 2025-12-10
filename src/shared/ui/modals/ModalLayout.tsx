'use client';

import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { IconButton, Text } from '@/shared/ui';

import { useModal } from '../../../app/providers';

import CloseIcon from './assets/icons/close.svg';
import styles from './ModalLayout.module.scss';

type ModalLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export const ModalLayout: ComponentWithProps<ModalLayoutProps> = ({
  children,
  title,
  className,
}) => {
  const { closeModal } = useModal();

  // Handling system buttons and search bars on mobile
  React.useEffect(() => {
    const adjustModalHeight = () => {
      const modalElement = document.querySelector(
        `.${styles.root}`,
      ) as HTMLElement | null;
      if (modalElement) {
        modalElement.style.height = `${window.innerHeight}px`;
      }
    };

    window.addEventListener('resize', adjustModalHeight);
    window.addEventListener('orientationchange', adjustModalHeight);

    // Initial adjustment
    adjustModalHeight();

    return () => {
      window.removeEventListener('resize', adjustModalHeight);
      window.removeEventListener('orientationchange', adjustModalHeight);
    };
  }, []);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.content}>
        <div className={styles.top}>
          <Text className={styles.title}>{title}</Text>
          <IconButton
            className={styles.closeButton}
            icon={<CloseIcon />}
            onClick={closeModal}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
