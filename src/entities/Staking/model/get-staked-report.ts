import { ChainId } from '@lifi/sdk';
import { BigNumber, utils } from 'ethers';

import { getProviderByChainId } from '@/entities/LiFi';
import { createStakeContract } from '@/shared/lib';

interface GetStakedReportProps {
  walletAddress: string;
  stakingAddress: string;
}

export interface IStakedReport {
  balance: string;
  lastClaimTimestamp: number;
  unlockTimestamp: number;
  yearlyReward: string;
}

export const getStakedReport = async ({
  walletAddress,
  stakingAddress,
}: GetStakedReportProps) => {
  const provider = getProviderByChainId(ChainId.BLS);

  if (!provider) {
    throw new Error('Wallet provider not found');
  }

  const stakingContract = createStakeContract(stakingAddress, provider);

  const [balance, lastClaimTimestamp, unlockTimestamp, yearlyReward] =
    await stakingContract.users(walletAddress);

  return {
    balance: utils.formatEther(balance),
    lastClaimTimestamp: lastClaimTimestamp.toNumber(),
    unlockTimestamp: unlockTimestamp.toNumber(),
    yearlyReward: utils.formatEther(yearlyReward),
  } as IStakedReport;
};
