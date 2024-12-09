import { ChainId } from '@lifi/sdk';
import { utils } from 'ethers';

import { getProviderByChainId } from '@/entities/LiFi';
import { createStakeContract } from '@/shared/lib';

interface GetTotalStakedProps {
  stakingAddress: string;
}

export const getTotalStaked = async ({
  stakingAddress,
}: GetTotalStakedProps) => {
  const provider = getProviderByChainId(ChainId.BLS);

  if (!provider) {
    throw new Error('Wallet provider not found');
  }

  const stackingContract = createStakeContract(stakingAddress, provider);

  const amount = await stackingContract.totalLocked();

  return utils.formatEther(amount);
};
