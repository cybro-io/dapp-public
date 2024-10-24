import { ChainId } from 'symbiosis-js-sdk';

export const getUniqueTokenId = (
  address: string,
  chainId: ChainId,
  chainFromId?: ChainId,
) => `${address}_${chainId}_${chainFromId ?? '0'}`;
