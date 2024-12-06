import React from 'react';

import { useCybroBalance, useAvailableRewards } from '@/entities/Staking';
import { useWeb3ModalAccount } from '@/shared/lib';
import { Group, Stack } from '@/shared/ui';
// import CybroIcon from '@assets/assets/cybro.svg';
import LockedCybroIcon from '@assets/assets/locked-cybro.svg';

import { StakingBalance } from './StakingBalance';

export const StakingBalances = () => {
  const { address } = useWeb3ModalAccount();

  const { isLoadingBalance, balance } = useCybroBalance(address);

  const { isLoadingAvailableRewards, rewards } = useAvailableRewards();

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
      {/*<StakingBalance*/}
      {/*  title="Total CYBRO Balance"*/}
      {/*  icon={<CybroIcon />}*/}
      {/*  balance={0}*/}
      {/*/>*/}
    </Stack>
  );
};
