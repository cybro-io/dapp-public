import { ChainId } from '@lifi/sdk';
import { utils } from 'ethers';

import { getProviderByChainId } from '@/shared/lib';
import { createStakeContract } from '@/shared/lib';

interface GetTotalStakedProps {
  stakingAddress: string;
  chainId: ChainId;
}

export const getTotalStaked = async ({
  stakingAddress,
  chainId,
}: GetTotalStakedProps) => {
  const provider = getProviderByChainId(chainId);

  if (!provider) {
    throw new Error('Wallet provider not found');
  }

  const stakingContract = createStakeContract(stakingAddress, provider);

  const amount = await stakingContract.totalLocked();

  return utils.formatEther(amount);
};
