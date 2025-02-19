import React from 'react';

import { ChainId } from '@lifi/types';

import {
  StakingBalance,
  useAvailableRewards,
  useStakingConfig,
} from '@/entities/Staking';
import { useGetErc20Balance, useWeb3ModalAccount } from '@/shared/lib';
import { Group, Stack } from '@/shared/ui';
import CybroIcon from '@assets/assets/cybro.svg';

export const StakingBalances = () => {
  const { address } = useWeb3ModalAccount();

  const { config } = useStakingConfig();

  const { balance, isLoadingBalance } = useGetErc20Balance({
    address,
    tokenAddress: config?.token.cybro,
    chainId: ChainId.BLS,
  });

  const { isLoadingAvailableRewards, rewards } = useAvailableRewards({
    stakingData: config?.staking_cybro,
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
