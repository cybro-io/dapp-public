import { ChainId } from '@lifi/sdk';
import { utils } from 'ethers';

import { getProviderByChainId } from '@/entities/LiFi';
import { createStakeContract } from '@/shared/lib';

interface GetStakingRewardProps {
  walletAddress: string;
  stakingAddress: string;
}

export const getStakingReward = async ({
  walletAddress,
  stakingAddress,
}: GetStakingRewardProps) => {
  const provider = getProviderByChainId(ChainId.BLS);

  if (!provider) {
    throw new Error('Wallet provider not found');
  }

  const stakingContract = createStakeContract(stakingAddress, provider);

  const amount = await stakingContract.getRewardOf(walletAddress);

  return utils.formatEther(amount);
};
