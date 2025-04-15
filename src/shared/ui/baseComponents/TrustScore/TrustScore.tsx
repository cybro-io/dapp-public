'use client';

import React from 'react';

import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';
import {
  Text,
  TrustScoreColor,
  TrustScoreColorToIcon,
  TrustScoreViewType,
} from '@/shared/ui';
import { formatTrustScore } from '@/shared/utils';

import PointerIcon from './assets/icons/pointer.svg';
import styles from './TrustScore.module.scss';
import { TrustScoreSmallSecondary } from './TrustScoreSmallSecondary';

export type TrustScoreProps = {
  value: number;
  viewType?: TrustScoreViewType;
  isBordered?: boolean;
};

export const TrustScore: ComponentWithProps<TrustScoreProps> = ({
  value,
  isBordered = true,
  viewType = TrustScoreViewType.Mobile,
  className,
}) => {
  const trustScoreColor = React.useMemo(() => {
    if (value <= 2) {
      return TrustScoreColor.Danger;
    }

    if (value < 8) {
      return TrustScoreColor.Warning;
    }

    return TrustScoreColor.Good;
  }, [value]);

  const pointerPosition = React.useMemo(() => {
    if (value <= 2) {
      return 'calc((26.32% * ' + value / 2 + ') - 7px)';
    }

    if (value < 8) {
      return 'calc((26.32% + 52.63% * ' + (value - 2) / 7 + ') - 7px)';
    }

    return 'calc((26.32% + 52.63% + 21.05% * ' + (value - 8) / 2 + ') - 7px)';
  }, [value]);

  if (viewType === TrustScoreViewType.SmallSecondary) {
    return <TrustScoreSmallSecondary value={value} />;
  }

  if (viewType === TrustScoreViewType.Small) {
    return (
      <div className={clsx(styles.tinyContainer, className)}>
        <div className={styles.iconContainer}>
          {TrustScoreColorToIcon[trustScoreColor]}
        </div>
        <Text className={clsx(styles.value, styles[trustScoreColor])}>
          {formatTrustScore(value)}
        </Text>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        styles.root,
        !isBordered && styles.notBordered,
        styles[viewType],
        className,
      )}
    >
      <div className={styles.cornerTopLeft} />
      <div className={styles.cornerTopRight} />
      <div className={styles.cornerBottomLeft} />
      <div className={styles.cornerBottomRight} />
      <div className={styles.iconContainer}>
        {TrustScoreColorToIcon[trustScoreColor]}
      </div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Text className={styles.title}>Trust Score</Text>
          <Text className={clsx(styles.value, styles[trustScoreColor])}>
            {formatTrustScore(value)}
          </Text>
        </div>
        <div className={styles.progressBarContainer}>
          <div
            className={clsx(styles.pointer, styles[trustScoreColor])}
            style={{ left: pointerPosition }}
          >
            <PointerIcon />
          </div>
          <div className={styles.progressBar}>
            <div
              className={clsx(
                styles.bar,
                styles.danger,
                trustScoreColor === TrustScoreColor.Danger && styles.active,
              )}
            />
            <div
              className={clsx(
                styles.bar,
                styles.warning,
                trustScoreColor === TrustScoreColor.Warning && styles.active,
              )}
            />
            <div
              className={clsx(
                styles.bar,
                styles.good,
                trustScoreColor === TrustScoreColor.Good && styles.active,
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
