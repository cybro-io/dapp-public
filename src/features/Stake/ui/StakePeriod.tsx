import React from 'react';

import { Skeleton } from '@heroui/react';

import { useStakeContext } from '@/features/Stake';
import { Group } from '@/shared/ui';

import { StakePeriodButton } from './StakePeriodButton';

export const StakePeriod = () => {
  const { period, setPeriod, stakingDataByChain } = useStakeContext();

  const periods = stakingDataByChain.sort(
    (stakeA, stakeB) => stakeB.months - stakeA.months,
  );

  return (
    <Group className="gap-2">
      {!stakingDataByChain && <StakePeriodLoader />}

      {stakingDataByChain &&
        periods.map((stake) => (
          <StakePeriodButton
            key={stake.months}
            month={stake.months}
            arpPercent={stake.percent}
            isActive={stake.months === period?.months}
            onClick={() => setPeriod(stake)}
            disabled={stake.months === 5}
          />
        ))}
    </Group>
  );
};

const StakePeriodLoader = () =>
  [0, 1, 2].map((value) => (
    <Skeleton
      key={value}
      className="w-[103px] h-[110px] rounded-[14px] dark:bg-background-tableRow"
    />
  ));
