'use client';

import React from 'react';

import clsx from 'clsx';
import numeral from 'numeral';

import { ComponentWithProps, Money, Nullable } from '@/shared/types';
import {
  Link,
  LinkView,
  Text,
  TextView,
  VaultStatsSkeleton,
} from '@/shared/ui';

import { VaultStatsView } from '../const';

import styles from './VaultStats.module.scss';

type VaultStatsProps = {
  apy: Nullable<string | number>;
  cybroPoints?: string | number;
  tvl: Nullable<Money>;
  chain: Nullable<string>;
  overallVaultInvestment?: string;
  earningsMonthly?: string | number;
  viewType?: VaultStatsView;
  tokenIcon?: string;
  isLoading?: boolean;
};

export const VaultStats: ComponentWithProps<VaultStatsProps> = ({
  apy,
  tvl,
  chain,
  overallVaultInvestment,
  viewType = VaultStatsView.Card,
  isLoading = false,
  className,
}) => {
  const cybroTvl = Number(overallVaultInvestment || 0);
  const vaultTvl = tvl ?? 0;

  const vaultTvlFormatted = numeral(vaultTvl).format('0.00a');
  const cybroTvlFormatted = numeral(cybroTvl).format('0.00a');

  if (isLoading) {
    return <VaultStatsSkeleton className={className} />;
  }

  if (viewType === VaultStatsView.Card) {
    return (
      <div className={clsx(styles.root, styles[viewType], className)}>
        <div className={styles.cardRow}>
          <div className={styles.cardTitleContainer}>
            <Text textView={TextView.C3} className={styles.detailsTitle}>
              30-day APY
            </Text>
            <div className={styles.detailsLine}></div>
            {/* Dashed line element */}
            <Text
              textView={TextView.P3}
              className={clsx(
                styles.detailsValue,
                styles.weeklyApyValue,
                styles.cardValue,
              )}
            >
              {apy}%
            </Text>
          </div>
        </div>
        <div className={styles.cardRow}>
          <div className={styles.cardTitleContainer}>
            <Link
              className={styles.cardTitle}
              viewType={vaultTvl ? LinkView.Tooltip : LinkView.Button}
              tooltipContent={
                <div className="flex flex-col">
                  <Text textView={TextView.C3} className={styles.detailsTitle}>
                    Total TVL: ${vaultTvlFormatted}
                  </Text>
                  <Text textView={TextView.C3} className={styles.detailsTitle}>
                    Cybro TVL: ${cybroTvlFormatted}
                  </Text>
                </div>
              }
              tooltipClassName={styles.tooltipContent}
            >
              <Text textView={TextView.C3} className={styles.detailsTitle}>
                TVL
              </Text>
            </Link>
            <div className={styles.detailsLine}></div>
            {/* Dashed line element */}
            <Text
              textView={TextView.P3}
              className={clsx(styles.detailsValue, styles.cardValue)}
            >
              {vaultTvl ? `$${vaultTvlFormatted}` : '–'}
            </Text>
          </div>
        </div>
        <div className={styles.cardRow}>
          <div className={styles.cardTitleContainer}>
            <Text textView={TextView.C3} className={styles.detailsTitle}>
              Chain
            </Text>
            <div className={styles.detailsLine}></div>
            {/* Dashed line element */}
            <Text
              textView={TextView.P3}
              className={clsx(styles.detailsValue, styles.cardValue)}
            >
              {chain}
            </Text>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={clsx(styles.root, styles[viewType], className)}>
      <div className={clsx(styles.firstRow, styles.row)}>
        <div className={styles.detailsItem}>
          <Text textView={TextView.C3} className={styles.detailsTitle}>
            30-day APY
          </Text>
          <Text
            textView={TextView.P3}
            className={clsx(styles.detailsValue, styles.weeklyApyValue)}
          >
            {apy}%
          </Text>
        </div>
        <div className={styles.detailsItem}>
          <Link
            viewType={vaultTvl ? LinkView.Tooltip : LinkView.Button}
            tooltipContent={
              <div className="flex flex-col">
                <Text textView={TextView.C3} className={styles.detailsTitle}>
                  Total TVL: ${vaultTvlFormatted}
                </Text>
                <Text textView={TextView.C3} className={styles.detailsTitle}>
                  Cybro TVL: ${cybroTvlFormatted}
                </Text>
              </div>
            }
            tooltipClassName={styles.tooltipContent}
          >
            <Text textView={TextView.C3} className={styles.detailsTitle}>
              TVL
            </Text>
          </Link>

          <Text textView={TextView.P3} className={styles.detailsValue}>
            {vaultTvl ? `$${vaultTvlFormatted}` : '–'}
          </Text>
        </div>
        <div className={styles.detailsItem}>
          <Text textView={TextView.C3} className={styles.detailsTitle}>
            Chain
          </Text>
          <Text
            textView={TextView.P3}
            className={clsx(styles.detailsValue, styles.provider)}
          >
            {chain}
          </Text>
        </div>
      </div>
    </div>
  );
};
