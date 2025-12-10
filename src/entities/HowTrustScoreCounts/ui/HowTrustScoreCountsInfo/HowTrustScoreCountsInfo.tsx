import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { HowTrustScoreCountsInfoViewType } from '@/entities/HowTrustScoreCounts';
import { ComponentWithProps } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';

import styles from './HowTrustScoreCountsInfo.module.scss';

type HowTrustScoreCountsInfoProps = {
  viewType?: HowTrustScoreCountsInfoViewType;
};

export const HowTrustScoreCountsInfo: ComponentWithProps<
  HowTrustScoreCountsInfoProps
> = ({ viewType = HowTrustScoreCountsInfoViewType.Modal, className }) => {
  return (
    <div className={clsx(styles.root, styles[viewType], className)}>
      {viewType === HowTrustScoreCountsInfoViewType.Tooltip && (
        <Text className={styles.title} textView={TextView.H4}>
          How the Trust Score Is Calculated
        </Text>
      )}
      <div className={styles.imagesContainer}>
        <div className={clsx(styles.leftImage, styles.image)}>
          <Image
            src={'/howCountsLeft.webp'}
            fill
            objectFit="contain"
            alt={''}
          />
        </div>
        <div className={clsx(styles.rightImage, styles.image)}>
          <Image
            src={'/howCountsRight.webp'}
            fill
            objectFit="contain"
            alt={''}
          />
        </div>
      </div>
      <Text className={styles.text}>
        The Trust Score is automatically calculated based on a vault's data,
        including its strategy, history, reputation, and reliability. Certain
        events can lower the Trust Score, while others can increase it.{' '}
        <span className={styles.bold}>
          You can view these events by selecting a specific vault and checking
          its Trust Score section.
        </span>
      </Text>
    </div>
  );
};
