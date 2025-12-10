import React from 'react';

import { StakingBalance, useAvailableRewards } from '@/entities/Staking';
import { useStakeContext } from '@/features/Stake';
import { useGetErc20Balance, useAppKitAccount } from '@/shared/lib';
import { Group, Stack } from '@/shared/ui';
import CybroIcon from '@assets/assets/cybro.svg';

export const StakingBalances = () => {
  const { address } = useAppKitAccount();

  const { stakingDataByChain, selectedChainId, tokenAddress } =
    useStakeContext();

  const { balance, isLoading: isLoadingBalance } = useGetErc20Balance({
    walletAddress: address,
    tokenAddress,
    chainId: selectedChainId,
  });

  const { isLoadingAvailableRewards, rewards } = useAvailableRewards({
    stakingData: stakingDataByChain,
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
          icon={<CybroIcon />}
          balance={balance}
          isLoading={isLoadingBalance}
        />
        <StakingBalance
          className="flex-grow"
          title="Available Rewards"
          icon={<CybroIcon />}
          balance={rewards}
          isLoading={isLoadingAvailableRewards}
        />
      </Group>
    </Stack>
  );
};
