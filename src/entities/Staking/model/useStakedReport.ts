import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';

import { QueryKey } from '@/shared/lib';
import { useAppKitAccount } from '@/shared/lib';
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
  chainId: ChainId;
}

export const useStakedReport = ({
  stakingData,
  chainId,
}: UseStakedReportProps) => {
  const { address } = useAppKitAccount();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.StakedReport, address, stakingData, chainId],
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
            chainId,
          }),
          getStakedReport({
            walletAddress: address,
            stakingAddress: staking.address,
            chainId,
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
