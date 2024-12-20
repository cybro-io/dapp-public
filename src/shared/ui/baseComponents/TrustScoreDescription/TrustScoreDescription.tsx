'use client';

import React from 'react';

import clsx from 'clsx';

import {
  ComponentWithProps,
  HistoryTrustScoreResponseData,
} from '@/shared/types';
import { Text, TextView } from '@/shared/ui';

import NegativeIcon from './assets/negative.svg';
import PositiveIcon from './assets/positive.svg';
import { TrustScoreVariant } from './const';
import styles from './TrustScoreDescription.module.scss';

type TrustScoreDescriptionProps = {
  details: HistoryTrustScoreResponseData;
};

export const TrustScoreDescription: ComponentWithProps<
  TrustScoreDescriptionProps
> = ({ details, className }) => {
  const variant = React.useMemo(() => {
    return details.direction === '+'
      ? TrustScoreVariant.Positive
      : TrustScoreVariant.Negative;
  }, [details]);

  return (
    <div className={clsx(styles.root, styles[variant], className)}>
      <div className={styles.trustScoreRating}>
        <div className={styles.cornerTopLeft} />
        <div className={styles.cornerTopRight} />
        <div className={styles.cornerBottomLeft} />
        <div className={styles.cornerBottomRight} />
        <p className={styles.value}>
          {Math.floor(details.trust_score)}
          <span className={styles.maxTrustScore}>/4</span>
        </p>
        <div className={styles.iconContainer}>
          {variant === TrustScoreVariant.Negative ? (
            <NegativeIcon />
          ) : (
            <PositiveIcon />
          )}
        </div>
      </div>
      <div className={styles.description}>
        <Text textView={TextView.H5}>{details.name}</Text>
        <Text className={styles.descriptionValue} textView={TextView.P3}>
          {details.description}
        </Text>
      </div>
    </div>
  );
};
