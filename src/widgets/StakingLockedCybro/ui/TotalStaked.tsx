import React from 'react';

import { TotalStakedField, useTotalStaked } from '@/entities/Staking';
import { useStakeContext } from '@/features/Stake';
import { Group, Stack, Title, Typography } from '@/shared/ui';

export const TotalStaked = () => {
  const { stakingDataByChain, selectedChainId } = useStakeContext();
  const { totalStaked, isLoadingTotalStaked } = useTotalStaked({
    stakingData: stakingDataByChain,
    chainId: selectedChainId,
  });

  return (
    <Stack className="gap-2">
      <Title order={4}>Total staked:</Title>
      <Group className="justify-evenly">
        {totalStaked.map((stake) => (
          <TotalStakedField
            key={stake.months}
            months={stake.months}
            amount={stake.amount}
            isLoading={isLoadingTotalStaked}
          />
        ))}
      </Group>

      <Typography
        variant="caption"
        order={4}
        className="text-text-accent-yellow"
      >
        A total of 5 million points will be distributed among all LCYBRO stakers
        who stake their tokens before the listing date.
      </Typography>
    </Stack>
  );
};
