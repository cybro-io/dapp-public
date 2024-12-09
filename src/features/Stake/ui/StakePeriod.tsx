import React from 'react';

import { Skeleton } from '@nextui-org/react';

import { useStakeContext } from '@/features/Stake';
import { Group } from '@/shared/ui';

import { StakePeriodButton } from './StakePeriodButton';

export const StakePeriod = () => {
  const {
    period,
    setPeriod,
    config: { config, isLoadingConfig },
  } = useStakeContext();

  const periods = (config?.staking ?? []).sort(
    (stakeA, stakeB) => stakeB.months - stakeA.months,
  );

  return (
    <Group className="gap-2">
      {isLoadingConfig && <StakePeriodLoader />}

      {!isLoadingConfig &&
        periods.map((stake) => (
          <StakePeriodButton
            key={stake.months}
            month={stake.months}
            arpPercent={stake.percent}
            isActive={stake.months === period?.months}
            onClick={() => setPeriod(stake)}
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
