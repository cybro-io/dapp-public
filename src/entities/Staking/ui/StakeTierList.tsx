import React from 'react';

import { Skeleton } from '@heroui/react';

import { stakeTiersKeysMap, useCurrentTier } from '@/entities/Staking';
import { StakeTier } from '@/entities/Staking';
import { Stack } from '@/shared/ui';

export const StakeTierList = () => {
  const { isLoading, currentTier, tiersData } = useCurrentTier();

  return (
    <Stack className="gap-3 flex-1 w-full items-center">
      {!isLoading &&
        tiersData?.map((tier) => (
          <StakeTier
            tier={tier}
            key={tier.index}
            isActive={currentTier?.index === tier.index}
          />
        ))}

      {isLoading &&
        stakeTiersKeysMap.map((key) => (
          <Skeleton
            key={key}
            className="w-full max-w-[320px] h-[104px] rounded-[14px]"
          />
        ))}
    </Stack>
  );
};
