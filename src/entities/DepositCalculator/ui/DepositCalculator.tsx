'use client';

import React, { Key } from 'react';

import { Skeleton } from '@nextui-org/react';
import { Tab, Tabs } from '@nextui-org/tabs';
import clsx from 'clsx';

import { PeriodTab } from '@/entities/DepositCalculator/const';
import { ConnectWallet } from '@/features/ConnectWallet';
import { track, AnalyticsEvent } from '@/shared/analytics';
import ScoreUpIcon from '@/shared/assets/icons/arrow-score-up.svg';
import { ComponentWithProps, Money } from '@/shared/types';
import { Button, Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import styles from './DepositCalculator.module.scss';

type DepositCalculatorProps = {
  deposit: (event: React.MouseEvent<HTMLButtonElement>) => Promise<void>;
  apy: number;
  setPeriod: React.Dispatch<React.SetStateAction<PeriodTab>>;
  buttonMessage: string | null;
  isButtonDisabled: boolean;
  text: string;
  profitUsd: Money;
  profitTokens: Money;
  balanceAfter: Money;
  balanceAfterText: string;
  isLoadingCalculate: boolean;
  withSwap: boolean;
};

const periods = [
  {
    key: PeriodTab.Year,
    title: 'Year',
  },
  {
    key: PeriodTab.Quarter,
    title: 'Quarter',
  },
  {
    key: PeriodTab.Month,
    title: 'Month',
  },
];

export const DepositCalculator: ComponentWithProps<DepositCalculatorProps> = ({
  deposit,
  apy,
  setPeriod,
  buttonMessage,
  isButtonDisabled,
  text,
  profitUsd,
  profitTokens,
  balanceAfter,
  balanceAfterText,
  className,
  isLoadingCalculate,
  withSwap,
}) => {
  const onTabChange = React.useCallback(
    (currentTab: Key) => {
      setPeriod(currentTab as PeriodTab);
      track.event(AnalyticsEvent.CalculatorPeriodChange, {
        period: currentTab,
      });
    },
    [setPeriod],
  );

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.projectedYield}>
        <div className={styles.tabsContainer}>
          <Tabs
            className={styles.yieldTabs}
            size="sm"
            onSelectionChange={onTabChange}
          >
            {periods.map(({ key, title }) => (
              <Tab key={key} title={title} />
            ))}
          </Tabs>
        </div>
        <div className={styles.yieldContainer}>
          <Text className={styles.resultTitle} textView={TextView.C3}>
            Projected Yield after Fees:
          </Text>
          <div className={styles.yieldValuesContainer}>
            {isLoadingCalculate ? (
              <Skeleton
                classNames={{
                  base: 'rounded-lg w-28 h-6 dark:bg-background-tableRow',
                }}
              />
            ) : (
              <Text className={styles.resultValue}>
                + {formatUserMoney(profitTokens || 0)}
              </Text>
            )}
            {isLoadingCalculate ? (
              <Skeleton
                classNames={{
                  base: 'rounded-lg w-20 h-[17px] dark:bg-background-tableRow',
                }}
              />
            ) : (
              <Text className={styles.resultActualValue}>
                ≈ ${formatUserMoney(profitUsd)}
              </Text>
            )}
          </div>
          <div className={styles.yieldPercents}>
            <div>
              <ScoreUpIcon />
            </div>
            <Text textView={TextView.C3}>
              {apy}% {text}
            </Text>
          </div>
        </div>
      </div>

      <Text textView={TextView.C2} className={styles.balanceAfter}>
        balance after {balanceAfterText}{' '}
        {isLoadingCalculate ? (
          <Skeleton
            as="span"
            classNames={{
              base: 'rounded-lg w-20 h-5 dark:bg-background-tableRow',
            }}
          />
        ) : (
          <span className={styles.balanceAfterValue}>
            {formatUserMoney(balanceAfter || 0, 8)}
          </span>
        )}
      </Text>

      <ConnectWallet
        className={styles.connectButton}
        whenConnectedComponent={
          <Button
            disabled={isButtonDisabled}
            className={styles.submitButton}
            onClick={deposit}
          >
            {buttonMessage || (withSwap ? 'Swap & Deposit' : 'Deposit')}
          </Button>
        }
        isForm
      />
    </div>
  );
};
