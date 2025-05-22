import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { BigNumberish } from 'ethers';

import { getTotalStaked } from '@/entities/Staking/model/get-total-staked';
import { getProviderByChainId } from '@/shared/lib';
import { QueryKey } from '@/shared/lib';
import { StakingData } from '@/shared/types';

interface TotalStaked {
  amount: BigNumberish;
  months: number;
}

interface UseTotalStakedProps {
  stakingData?: Array<StakingData>;
  chainId: ChainId;
}

export const useTotalStaked = ({
  stakingData,
  chainId,
}: UseTotalStakedProps) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.TotalStaked, stakingData, chainId],
    enabled: Boolean(stakingData),
    queryFn: async () => {
      console.log('getTotalStaked');

      if (!stakingData) {
        return defaultTotalStaked;
      }

      const provider = getProviderByChainId(chainId);

      if (!provider) {
        return defaultTotalStaked;
      }

      const totalStaked: Array<TotalStaked> = [];

      for (const staking of stakingData) {
        const amount = await getTotalStaked({
          stakingAddress: staking.address,
          chainId,
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
    isLoadingTotalStaked: isLoading || !stakingData,
  };
};

const defaultTotalStaked: Array<TotalStaked> = [
  { amount: 0, months: 15 },
  { amount: 0, months: 10 },
  { amount: 0, months: 5 },
];
