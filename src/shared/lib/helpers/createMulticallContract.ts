import { ethers, Signer } from 'ethers';

import abi from '@/shared/abi/multicall.json';
import { Multicall } from '@/shared/types';

export const createMulticallContract = (
  contractAddress: string,
  signerOrProvider?: Signer | ethers.providers.Provider,
) => {
  return new ethers.Contract(
    contractAddress,
    abi,
    signerOrProvider,
  ) as Multicall;
};
