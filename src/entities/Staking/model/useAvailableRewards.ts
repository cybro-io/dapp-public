import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';

import { QueryKey } from '@/shared/const';
import { useWeb3ModalAccount } from '@/shared/lib';
import { StakingData } from '@/shared/types';

import { getStakingReward } from './get-staking-reward';

interface UseAvailableRewardsProps {
  stakingData?: Array<StakingData>;
}

export const useAvailableRewards = ({
  stakingData,
}: UseAvailableRewardsProps) => {
  const { address } = useWeb3ModalAccount();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.AvailableRewards, stakingData, address],
    queryFn: async () => {
      console.log('getAvailableRewards');
      if (!stakingData || !address) {
        return 0;
      }

      const promises = stakingData.map((staking) =>
        getStakingReward({
          walletAddress: address,
          stakingAddress: staking.address,
        }),
      );

      const response = await Promise.all(promises);

      return response.reduce((a, b) => new BigNumber(a).plus(b).toNumber(), 0);
    },
    enabled: Boolean(address) && Boolean(stakingData),
  });

  return { rewards: data ?? 0, isLoadingAvailableRewards: isLoading };
};