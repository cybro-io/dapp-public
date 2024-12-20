import React from 'react';

import {
  useCybroBalance,
  useAvailableRewards,
  useStakingConfig,
} from '@/entities/Staking';
import { StakingBalance } from '@/entities/Staking';
import { useWeb3ModalAccount } from '@/shared/lib';
import { Group, Stack } from '@/shared/ui';
import LockedCybroIcon from '@assets/assets/locked-cybro.svg';

export const StakingBalances = () => {
  const { address } = useWeb3ModalAccount();

  const { isLoadingBalance, balance } = useCybroBalance(address);

  const { config } = useStakingConfig();
  const { isLoadingAvailableRewards, rewards } = useAvailableRewards({
    stakingData: config?.staking,
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
          balance={balance.locked}
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
