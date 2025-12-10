'use client';

import React from 'react';

import clsx from 'clsx';

import styles from './RoundedCard.module.scss';

interface RoundedCardProps extends React.PropsWithChildren {
  onHeaderClick?: () => void;
  classNames?: {
    header?: string;
    footer?: string;
    container?: string;
    content?: string;
  };
  slots?: {
    header?: React.ReactNode;
    footer?: React.ReactNode;
  };
}

export const RoundedCard = ({
  onHeaderClick,
  classNames,
  children,
  slots,
}: RoundedCardProps) => {
  return (
    <div className={clsx(styles.container, classNames?.container)}>
      <div
        className={clsx(styles.header, classNames?.header)}
        onClick={onHeaderClick}
      >
        {slots?.header}
      </div>

      <div className={clsx(classNames?.content)}>{children}</div>

      <div className={clsx(classNames?.footer)}>{slots?.footer}</div>
    </div>
  );
};
