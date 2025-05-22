import React, { memo } from 'react';

import { Skeleton } from '@heroui/react';

import { PeriodTab } from '@/entities/fund';
import { useFundDepositContext } from '@/features/FundDeposit';
import ScoreUpIcon from '@/shared/assets/icons/arrow-score-up.svg';
import { Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

const periodNames: Record<PeriodTab, string> = {
  [PeriodTab.Year]: 'yearly',
  [PeriodTab.Quarter]: 'quarterly',
  [PeriodTab.Month]: 'monthly',
};

export const FundDepositProfit = memo(() => {
  const {
    period,
    periodApy,
    profit,
    profitUsd,
    isLoadingPrice,
    isLoadingCalculate,
    isLoadingDefaultTokenPrice,
  } = useFundDepositContext();

  const isLoading =
    isLoadingPrice || isLoadingDefaultTokenPrice || isLoadingCalculate;

  return (
    <div className="p-4 flex flex-col gap-2 bg-background-window rounded-[20px]">
      <div className="flex flex-col">
        <Text textView={TextView.C4} className="!text-white/60">
          Projected Yield:
        </Text>

        <div className="flex flex-row flex-wrap gap-2 items-center">
          <Skeleton
            isLoaded={!isLoading}
            className="rounded-lg dark:bg-background-tableRow"
          >
            <Text textView={TextView.BP1}>+ {formatUserMoney(profit)}</Text>
          </Skeleton>
          <Skeleton
            isLoaded={!isLoading}
            className="rounded-lg dark:bg-background-tableRow"
          >
            <Text textView={TextView.C2} className="!text-white/60">
              ≈ ${profitUsd}
            </Text>
          </Skeleton>
        </div>
      </div>
      <div className="flex flex-row gap-2">
        <ScoreUpIcon />
        <Text textView={TextView.C4} className="!text-white/80">
          {formatUserMoney(periodApy, 2)}% {periodNames[period]}
        </Text>
      </div>
    </div>
  );
});
