import { ethers, Signer } from 'ethers';

import stakeAbi from '@/shared/abi/stakeContract.json';
import { StakeContract } from '@/shared/types';

export const createStakeContract = (
  tokenAddress: string,
  signerOrProvider?: Signer | ethers.providers.Provider,
) => {
  return new ethers.Contract(
    tokenAddress,
    stakeAbi,
    signerOrProvider,
  ) as StakeContract;
};
