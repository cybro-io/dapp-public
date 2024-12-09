import { Token } from 'symbiosis-js-sdk';

import tokens from '@/shared/lib/constants/tokens.json';

interface TokenData {
  chainId: number;
  name: string;
  symbol: string;
  address: string;
  decimals: number;
  logoURI?: string;
}

export const swapTokens = (tokens as TokenData[]).map(
  ({ logoURI, ...restToken }) =>
    new Token({ ...restToken, icons: { small: logoURI } }),
);
