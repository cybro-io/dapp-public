import { getChainById } from '@lifi/data-types';
import { Token } from '@lifi/sdk';

import { links } from '@/shared/lib';

import { SelectedTokenCrypto } from '../types';

export const convertToSelectedToken = (
  token?: Token,
): SelectedTokenCrypto | null => {
  if (!token) {
    return null;
  }

  const chain = getChainById(token.chainId);

  return {
    isCrypto: true,
    address: token.address,
    symbol: token.symbol ?? 'Unnamed',
    decimals: token.decimals,
    logoUrl: token.logoURI || links.noImage,
    chain: {
      id: token.chainId,
      logoUrl: chain.logoURI ?? links.noImage,
      name: chain.name,
    },
  };
};
