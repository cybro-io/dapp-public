import { ChainId } from '@lifi/sdk';
import { utils } from 'ethers';

import { getProviderByChainId } from '@/shared/lib';
import { createStakeContract } from '@/shared/lib';

interface GetStakingRewardProps {
  walletAddress: string;
  stakingAddress: string;
  chainId: ChainId;
}

export const getStakingReward = async ({
  walletAddress,
  stakingAddress,
  chainId,
}: GetStakingRewardProps) => {
  const provider = getProviderByChainId(chainId);

  if (!provider) {
    throw new Error('Wallet provider not found');
  }

  const stakingContract = createStakeContract(stakingAddress, provider);

  const amount = await stakingContract.getRewardOf(walletAddress);

  return utils.formatEther(amount);
};
