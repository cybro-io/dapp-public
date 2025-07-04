import React, { memo } from 'react';

import { Skeleton } from '@heroui/react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

import { useFundWithdrawContext } from '@/features/FundWithdraw';
import ScoreUpIcon from '@/shared/assets/icons/arrow-score-up.svg';
import { Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';
import TimerIcon from '@assets/icons/clock.svg';

dayjs.extend(duration);

export const FundWithdrawReceive = memo(() => {
  const { vaultTokenPriceUsd, isLoadingVaultTokenPriceUsd, timer } =
    useFundWithdrawContext();

  return (
    <div className="p-4 flex flex-col gap-2 bg-background-window rounded-[20px]">
      <div className="flex flex-row justify-between items-center">
        <Text
          className="flex flex-row items-center gap-1"
          textView={TextView.C3}
        >
          <span>
            <TimerIcon />
          </span>
          {dayjs.duration(timer, 'second').format('mm:ss')}
        </Text>
        <div className="flex flex-row items-center gap-2">
          <Text textView={TextView.C3}>Current Rate:</Text>
          <Text
            className="flex flex-row items-center gap-1"
            textView={TextView.C3}
          >
            <span>
              <ScoreUpIcon />
            </span>
            <Skeleton
              isLoaded={!isLoadingVaultTokenPriceUsd}
              className="rounded-lg dark:bg-background-tableRow"
            >
              ${formatUserMoney(vaultTokenPriceUsd)}
            </Skeleton>
          </Text>
        </div>
      </div>
    </div>
  );
});
