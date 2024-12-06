import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import { Text } from '@/shared/ui';

import styles from './FeeBanner.module.scss';

type FeeBannerProps = {};

export const FeeBanner: ComponentWithProps<FeeBannerProps> = ({
  className,
}) => {
  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.items}>
        <div className={styles.item}>
          <Text className={clsx(styles.title, styles.gradient)}>
            Performance fee
          </Text>
          <div className={styles.line} />
          <Text className={styles.value}>0%</Text>
        </div>
        <div className={styles.item}>
          <Text className={clsx(styles.title, styles.gradient)}>
            Withdrawal Fee
          </Text>
          <div className={styles.line} />
          <Text className={styles.value}>0%</Text>
        </div>
        <div className={styles.item}>
          <Text className={clsx(styles.title, styles.gradient)}>
            Deposit Fee
          </Text>
          <div className={styles.line} />
          <Text className={styles.value}>0%</Text>
        </div>
      </div>
      <Text className={styles.description}>
        No hidden fees or additional charges.{' '}
        <span className={styles.dark}>
          Ensuring complete transparency in all transactions.
        </span>
      </Text>
    </div>
  );
};
