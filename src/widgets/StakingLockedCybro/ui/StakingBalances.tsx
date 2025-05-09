import React from 'react';

import { useCybroBalance, useAvailableRewards } from '@/entities/Staking';
import { StakingBalance } from '@/entities/Staking';
import { useStakeContext } from '@/features/Stake';
import { useAppKitAccount } from '@/shared/lib';
import { Group, Stack } from '@/shared/ui';
import LockedCybroIcon from '@assets/assets/locked-cybro.svg';

export const StakingBalances = () => {
  const { stakingDataByChain, selectedChainId } = useStakeContext();
  const { address } = useAppKitAccount();

  const { isLoadingAvailableRewards, rewards } = useAvailableRewards({
    stakingData: stakingDataByChain,
    chainId: selectedChainId,
  });

  const { isLoadingBalance, balance } = useCybroBalance({
    address,
    chainId: selectedChainId,
  });

  if (!address) {
    return null;
  }

  return (
    <Stack className="gap-[15px]">
      <Group className="justify-between gap-[22px]">
        <StakingBalance
          className="flex-grow"
          title="Available Balance"
          icon={<LockedCybroIcon />}
          balance={balance?.locked ?? 0}
          isLoading={isLoadingBalance}
        />
        <StakingBalance
          className="flex-grow"
          title="Available Rewards"
          icon={<LockedCybroIcon />}
          balance={rewards}
          isLoading={isLoadingAvailableRewards}
        />
      </Group>
    </Stack>
  );
};
