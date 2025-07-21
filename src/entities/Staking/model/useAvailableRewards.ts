import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';

import { QueryKey } from '@/shared/lib';
import { useAppKitAccount } from '@/shared/lib';
import { StakingData } from '@/shared/types';

import { getStakingReward } from './get-staking-reward';

interface UseAvailableRewardsProps {
  stakingData?: Array<StakingData>;
  chainId: ChainId;
}

export const useAvailableRewards = ({
  stakingData,
  chainId,
}: UseAvailableRewardsProps) => {
  const { address } = useAppKitAccount();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.AvailableRewards, stakingData, address, chainId],
    queryFn: async () => {
      console.log('getAvailableRewards');
      if (!stakingData || !address) {
        return 0;
      }

      const promises = stakingData.map((staking) =>
        getStakingReward({
          walletAddress: address,
          stakingAddress: staking.address,
          chainId,
        }),
      );

      const response = await Promise.all(promises);

      return response.reduce((a, b) => new BigNumber(a).plus(b).toNumber(), 0);
    },
    enabled: Boolean(address) && Boolean(stakingData),
  });

  return { rewards: data ?? 0, isLoadingAvailableRewards: isLoading };
};
