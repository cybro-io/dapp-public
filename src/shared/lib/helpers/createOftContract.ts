import { ethers, Signer } from 'ethers';

import oftAbi from '@/shared/abi/oft.json';
import { Oft } from '@/shared/types';

export const createOftContract = (
  oftAddress: string,
  signerOrProvider?: Signer | ethers.providers.Provider,
) => {
  return new ethers.Contract(oftAddress, oftAbi, signerOrProvider) as Oft;
};
