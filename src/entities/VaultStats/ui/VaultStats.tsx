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
  yourDeposit?: Money;
  availableFunds?: Money;
  earningsMonthly?: string | number;
  viewType?: VaultStatsView;
  tokenIcon?: string;
  isLoading?: boolean;
};

export const VaultStats: ComponentWithProps<VaultStatsProps> = ({
  apy,
  tvl,
  provider,
  yourDeposit,
  overallVaultInvestment,
  availableFunds,
  earningsMonthly,
  viewType = VaultStatsView.Card,
  tokenIcon,
  isLoading = false,
  className,
}) => {
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
            <Text textView={TextView.C3} className={styles.detailsTitle}>
              TVL
            </Text>
            <div className={styles.detailsLine}></div>
            {/* Dashed line element */}
            <Text
              textView={TextView.P3}
              className={clsx(styles.detailsValue, styles.cardValue)}
            >
              ${numeral(Math.floor(Number(tvl))).format('0.0a')}
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
        {overallVaultInvestment && (
          <div className={styles.cardRow}>
            <div className={styles.cardTitleContainer}>
              <Text textView={TextView.C3} className={styles.detailsTitle}>
                Overall Vault Investments
              </Text>
              <div className={styles.detailsLine}></div>
              {/* Dashed line element */}
              <Text
                textView={TextView.P3}
                className={clsx(styles.detailsValue, styles.cardValue)}
              >
                ${formatUserMoney(overallVaultInvestment)}
              </Text>
            </div>
          </div>
        )}
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
          <Text textView={TextView.C3} className={styles.detailsTitle}>
            TVL
          </Text>
          <Text textView={TextView.P3} className={styles.detailsValue}>
            ${numeral(Math.floor(Number(tvl))).format('0.0a')}
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
      {overallVaultInvestment && (
        <div className={clsx(styles.secondRow)}>
          <div className={styles.detailsItem}>
            <Text textView={TextView.C3} className={styles.detailsTitle}>
              Overall Vault Investments
            </Text>
            <Text
              textView={TextView.P3}
              className={clsx(styles.detailsValue, styles.vaultInvestment)}
            >
              <span className={styles.light}>$</span>
              {formatUserMoney(overallVaultInvestment)}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};
