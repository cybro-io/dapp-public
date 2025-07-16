import { ChainId } from '@lifi/sdk';
import { utils } from 'ethers';

import { getProviderByChainId } from '@/shared/lib';
import { createStakeContract } from '@/shared/lib';

interface GetStakedReportProps {
  walletAddress: string;
  stakingAddress: string;
  chainId: ChainId;
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
  chainId,
}: GetStakedReportProps) => {
  const provider = getProviderByChainId(chainId);

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
