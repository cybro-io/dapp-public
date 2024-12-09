import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { BigNumberish } from 'ethers';

import { getProviderByChainId } from '@/entities/LiFi';
import { getTotalStaked } from '@/entities/Staking/model/get-total-staked';
import { QueryKey } from '@/shared/const';

import { useStakingConfig } from './useStakingConfig';

interface TotalStaked {
  amount: BigNumberish;
  months: number;
}

export const useTotalStaked = () => {
  const { config } = useStakingConfig();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.TotalStaked, config?.token.locked, config],
    enabled: Boolean(config),
    queryFn: async () => {
      console.log('getTotalStaked');
      if (!config) {
        return defaultTotalStaked;
      }

      const provider = getProviderByChainId(ChainId.BLS);
      if (!provider) {
        return defaultTotalStaked;
      }

      const totalStaked: Array<TotalStaked> = [];

      for (const staking of config.staking) {
        const amount = await getTotalStaked({
          stakingAddress: staking.address,
        });

        totalStaked.push({
          amount,
          months: staking.months,
        });
      }

      return totalStaked;
    },
  });

  return {
    totalStaked: data ?? defaultTotalStaked,
    isLoadingTotalStaked: isLoading || !config,
  };
};

const defaultTotalStaked: Array<TotalStaked> = [
  { amount: 0, months: 15 },
  { amount: 0, months: 10 },
  { amount: 0, months: 5 },
];
