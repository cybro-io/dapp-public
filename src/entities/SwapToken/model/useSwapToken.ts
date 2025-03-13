import React from 'react';

import { ChainId, GAS_TOKEN, Token, tokenEquals } from 'symbiosis-js-sdk';

import { swapTokens, useSwapChains } from '@/entities/SwapToken';
import { TYPE_SYMBIOSIS, useSymbiosis } from '@/shared/lib';

export const useSwapTokens = () => {
  const symbiosis = useSymbiosis();
  const swapChains = useSwapChains();

  const tokens = React.useMemo(() => {
    const symbiosisTokens = symbiosis.tokens().map((token) => new Token(token));

    const allTokens = Object.values(GAS_TOKEN).concat(
      TYPE_SYMBIOSIS === 'mainnet' ? swapTokens : [],
      symbiosisTokens,
    );

    return allTokens.filter(
      (token, index) =>
        swapChains.findIndex(({ id }) => id === token.chainId) !== -1 &&
        allTokens.findIndex((findToken) => tokenEquals(findToken, token)) ===
          index,
    );
  }, []);

  const findToken = (address: string, chainId: ChainId) =>
    tokens.find(
      (token) =>
        token.address.toLowerCase() === address.toLowerCase() &&
        token.chainId === chainId,
    );

  return { tokens, findToken };
};
