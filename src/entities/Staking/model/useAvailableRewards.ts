import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';

import { QueryKey } from '@/shared/const';
import { useWeb3ModalAccount } from '@/shared/lib';

import { getStakingReward } from './get-staking-reward';
import { useStakingConfig } from './useStakingConfig';

export const useAvailableRewards = () => {
  const { address } = useWeb3ModalAccount();
  const { config, isLoadingConfig } = useStakingConfig();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.AvailableRewards, config, address],
    queryFn: async () => {
      console.log('getAvailableRewards');
      if (!config || !address) {
        return 0;
      }

      const promises = config.staking.map((staking) =>
        getStakingReward({
          walletAddress: address,
          stakingAddress: staking.address,
        }),
      );

      const response = await Promise.all(promises);

      return response.reduce((a, b) => new BigNumber(a).plus(b).toNumber(), 0);
    },
    enabled: !isLoadingConfig && Boolean(address) && Boolean(config),
  });

  return { rewards: data ?? 0, isLoadingAvailableRewards: isLoading };
};
