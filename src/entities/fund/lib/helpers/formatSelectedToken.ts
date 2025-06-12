import { Token } from 'symbiosis-js-sdk';

import { links } from '@/shared/lib';

import { SelectedTokenCrypto } from '../types';

export const convertToSelectedToken = (token: Token): SelectedTokenCrypto => {
  return {
    isCrypto: true,
    address: token.address,
    symbol: token.symbol ?? 'Unnamed',
    decimals: token.decimals,
    logoUrl: token.icons?.small ?? links.noImage,
    chain: {
      id: token.chainId,
      logoUrl: token.chain?.icons?.small ?? links.noImage,
      name: token.chain?.name ?? 'Unknown',
    },
  };
};
