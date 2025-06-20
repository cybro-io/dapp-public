import { useCallback } from 'react';

import { ChainType, ChainId, getTokens, Token } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';

import { QueryKey, swapChains } from '@/shared/lib';

const defaultTokens: { [p: number]: Token[] } = {};

export const useSwapTokens = () => {
  const {
    isPending,
    isLoading,
    data: tokens,
  } = useQuery({
    queryFn: async () => {
      const response = await getTokens({
        chains: swapChains.map((chain) => chain.id as ChainId),
        chainTypes: [ChainType.EVM],
      });

      return response.tokens;
    },
    queryKey: [QueryKey.TokenList],
  });

  const findToken = useCallback(
    (address: string, chainId: ChainId) =>
      tokens?.[chainId].find(
        (token) => token.address.toLowerCase() === address.toLowerCase(),
      ),
    [tokens],
  );

  const findTokenBySymbol = useCallback(
    (symbol: string, chainId: ChainId) =>
      tokens?.[chainId].find(
        (token) => token.symbol.toLowerCase() === symbol.toLowerCase(),
      ),
    [tokens],
  );

  return {
    findToken,
    findTokenBySymbol,
    isLoading,
    isPending,
    tokens: tokens ?? defaultTokens,
  };
};
