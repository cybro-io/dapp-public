import { ethers, Signer } from 'ethers';

import abi from '@/shared/abi/feeProvider.json';
import { FeeProvider } from '@/shared/types';

export const createFeeProviderContract = (
  contractAddress: string,
  signerOrProvider?: Signer | ethers.providers.Provider,
) => {
  return new ethers.Contract(
    contractAddress,
    abi,
    signerOrProvider,
  ) as FeeProvider;
};
