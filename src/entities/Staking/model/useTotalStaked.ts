import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { BigNumberish } from 'ethers';

import { getProviderByChainId } from '@/entities/LiFi';
import { getTotalStaked } from '@/entities/Staking/model/get-total-staked';
import { QueryKey } from '@/shared/const';
import { StakingData } from '@/shared/types';

interface TotalStaked {
  amount: BigNumberish;
  months: number;
}

interface UseTotalStakedProps {
  stakingData?: Array<StakingData>;
}

export const useTotalStaked = ({ stakingData }: UseTotalStakedProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.TotalStaked, stakingData],
    enabled: Boolean(stakingData),
    queryFn: async () => {
      console.log('getTotalStaked');

      console.log(stakingData);
      if (!stakingData) {
        return defaultTotalStaked;
      }

      const provider = getProviderByChainId(ChainId.BLS);

      console.log('provider', provider);
      if (!provider) {
        return defaultTotalStaked;
      }

      const totalStaked: Array<TotalStaked> = [];

      for (const staking of stakingData) {
        const amount = await getTotalStaked({
          stakingAddress: staking.address,
        });

        totalStaked.push({
          amount,
          months: staking.months,
        });
      }

      console.log(totalStaked);
      return totalStaked;
    },
  });

  return {
    totalStaked: data ?? defaultTotalStaked,
    isLoadingTotalStaked: isLoading || !stakingData,
  };
};

const defaultTotalStaked: Array<TotalStaked> = [
  { amount: 0, months: 15 },
  { amount: 0, months: 10 },
  { amount: 0, months: 5 },
];
