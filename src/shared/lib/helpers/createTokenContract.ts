import { ethers, Signer } from 'ethers';

import tokenAbi from '@/shared/abi/token.json';
import { Token } from '@/shared/types';

export const createTokenContract = (
  tokenAddress: string,
  signerOrProvider?: Signer | ethers.providers.Provider,
) => {
  return new ethers.Contract(tokenAddress, tokenAbi, signerOrProvider) as Token;
};
