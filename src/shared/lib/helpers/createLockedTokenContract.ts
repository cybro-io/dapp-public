import { ethers, Signer } from 'ethers';

import abi from '@/shared/abi/lockedTokenContract.json';
import { LockedTokenContract } from '@/shared/types';

export const createLockedTokenContract = (
  tokenAddress: string,
  signerOrProvider?: Signer | ethers.providers.Provider,
) => {
  return new ethers.Contract(
    tokenAddress,
    abi,
    signerOrProvider,
  ) as LockedTokenContract;
};
