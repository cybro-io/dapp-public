'use client';

import React from 'react';

import clsx from 'clsx';
import numeral from 'numeral';

import { ComponentWithProps, Money, Nullable } from '@/shared/types';
import {
  Chip,
  Link,
  LinkView,
  Text,
  TextView,
  VaultStatsSkeleton,
} from '@/shared/ui';
import { formatUserMoney, isInvalid } from '@/shared/utils';

import { VaultStatsView } from '../const';

import styles from './VaultStats.module.scss';

type VaultStatsProps = {
  apy: Nullable<string | number>;
  cybroPoints?: string | number;
  tvl: Nullable<Money>;
  provider: Nullable<string>;
  overallVaultInvestment?: string;
  earningsMonthly?: string | number;
  viewType?: VaultStatsView;
  tokenIcon?: string;
  isLoading?: boolean;
};

export const VaultStats: ComponentWithProps<VaultStatsProps> = ({
  apy,
  tvl,
  provider,
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
            <Link
              className={styles.cardTitle}
              viewType={LinkView.Tooltip}
              tooltipContent={"Vault's APY is calculated as a daily average"}
              tooltipClassName={styles.tooltipContent}
            >
              <Text textView={TextView.C3} className={styles.detailsTitle}>
                APY
              </Text>
            </Link>
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
              viewType={LinkView.Tooltip}
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
              ${vaultTvlFormatted}
            </Text>
          </div>
        </div>
        <div className={styles.cardRow}>
          <div className={styles.cardTitleContainer}>
            <Text textView={TextView.C3} className={styles.detailsTitle}>
              Provider
            </Text>
            <div className={styles.detailsLine}></div>
            {/* Dashed line element */}
            <Text
              textView={TextView.P3}
              className={clsx(styles.detailsValue, styles.cardValue)}
            >
              {provider}
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
          <Link
            viewType={LinkView.Tooltip}
            tooltipContent={"Vault's APY is calculated as a daily average"}
            tooltipClassName={styles.tooltipContent}
          >
            <Text textView={TextView.C3} className={styles.detailsTitle}>
              APY
            </Text>
          </Link>
          <Text
            textView={TextView.P3}
            className={clsx(styles.detailsValue, styles.weeklyApyValue)}
          >
            {apy}%
          </Text>
        </div>
        <div className={styles.detailsItem}>
          <Link
            viewType={LinkView.Tooltip}
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
            ${vaultTvlFormatted}
          </Text>
        </div>
        <div className={styles.detailsItem}>
          <Text textView={TextView.C3} className={styles.detailsTitle}>
            Provider
          </Text>
          <Text
            textView={TextView.P3}
            className={clsx(styles.detailsValue, styles.provider)}
          >
            {provider}
          </Text>
        </div>
      </div>
    </div>
  );
};