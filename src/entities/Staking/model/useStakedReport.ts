import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';

import { QueryKey } from '@/shared/const';
import { useWeb3ModalAccount } from '@/shared/lib';
import { StakingData } from '@/shared/types';

import { getStakedReport } from './get-staked-report';
import { getStakingReward } from './get-staking-reward';

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

interface UseStakedReportProps {
  stakingData?: Array<StakingData>;
}

export const useStakedReport = ({ stakingData }: UseStakedReportProps) => {
  const { address } = useWeb3ModalAccount();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.StakedReport, address, stakingData],
    queryFn: async () => {
      console.log('getStakedReport');

      if (!stakingData || !address) {
        return [];
      }

      const promises = stakingData.map((staking) =>
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
          address: stakingData[index].address,
          reward: item[0],
          report: item[1],
        }))
        .filter(
          ({ report }) => !new BigNumber(report.balance).isZero(),
        ) as StakedReport[];
    },
    enabled: Boolean(address) && Boolean(stakingData),
  });

  return { report: data ?? [], isLoadingReport: isLoading };
};
