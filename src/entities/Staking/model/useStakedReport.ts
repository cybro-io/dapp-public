import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';

import { QueryKey } from '@/shared/const';
import { useWeb3ModalAccount } from '@/shared/lib';

import { getStakedReport } from './get-staked-report';
import { getStakingReward } from './get-staking-reward';
import { useStakingConfig } from './useStakingConfig';

interface StakedReport {
  reward: string;
  report: {
    balance: string;
    lastClaimTimestamp: number;
    unlockTimestamp: number;
    yearlyReward: string;
  };
  address: string;
}

export const useStakedReport = () => {
  const { address } = useWeb3ModalAccount();
  const { config, isLoadingConfig } = useStakingConfig();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.StakedReport, address, config, config?.token.locked],
    queryFn: async () => {
      console.log('getStakedReport');

      if (!config || !address) {
        return [];
      }

      const promises = config.staking.map((staking) =>
        Promise.all([
          getStakingReward({
            walletAddress: address,
            stakingAddress: staking.address,
          }),
          getStakedReport({
            walletAddress: address,
            stakingAddress: staking.address,
          }),
        ]),
      );

      const response = await Promise.all(promises);

      return response
        .map((item, index) => ({
          address: config.staking[index].address,
          reward: item[0],
          report: item[1],
        }))
        .filter(
          ({ report }) => !new BigNumber(report.balance).isZero(),
        ) as StakedReport[];
    },
    enabled: !isLoadingConfig && Boolean(address) && Boolean(config),
  });

  return { report: data ?? [], isLoadingReport: isLoading };
};
