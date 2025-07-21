import { ethers, Signer } from 'ethers';

import abi from '@/shared/abi/exchangeContract.json';
import { ExchangeContract } from '@/shared/types';

export const createExchangeContract = (
  tokenAddress: string,
  signerOrProvider?: Signer | ethers.providers.Provider,
) => {
  return new ethers.Contract(
    tokenAddress,
    abi,
    signerOrProvider,
  ) as ExchangeContract;
};
