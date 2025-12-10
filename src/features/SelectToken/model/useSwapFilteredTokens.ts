import React from 'react';

import BigNumber from 'bignumber.js';
import { useDebounceValue } from 'usehooks-ts';

import { SelectedToken } from '@/entities/fund';
import { getUniqueSelectedTokenId } from '@/entities/SwapToken';
import { useGetSelectedChain } from '@/features/SelectToken';
import { FIAT_CHAIN_ID } from '@/features/SelectToken/model/useSwapChains';
import { useTokenBalancesByChain } from '@/shared/lib';

export const useSwapFilteredTokens = (
  tokens: SelectedToken[],
  selectedTokenId: string,
  nativeTokensId: string[],
) => {
  const selectedChainId = useGetSelectedChain();

  const { findBalanceByToken, tokenBalances } = useTokenBalancesByChain();

  const [searchToken, setSearchToken] = React.useState('');
  const [debouncedSearchToken] = useDebounceValue(searchToken, 500);

  const withSortNativeTokens = (tokens: SelectedToken[]) =>
    tokens.sort((tokenA) =>
      nativeTokensId.includes(getUniqueSelectedTokenId(tokenA)) ? -1 : 0,
    );

  const withSortPositiveBalance = (tokens: SelectedToken[]) =>
    tokens.sort((tokenA, tokenB) => {
      if (!tokenA.isCrypto) {
        return 1;
      }

      if (!tokenB.isCrypto) {
        return -1;
      }

      const tokenAmountA = new BigNumber(
        findBalanceByToken(tokenA.chain.id, tokenA.address)?.amountUSD ?? 0,
      ).toNumber();

      const tokenAmountB = new BigNumber(
        findBalanceByToken(tokenB.chain.id, tokenB.address)?.amountUSD ?? 0,
      ).toNumber();

      return tokenAmountB - tokenAmountA;
    });

  const withSortSelected = (tokens: SelectedToken[]) =>
    tokens.sort((tokenA) =>
      getUniqueSelectedTokenId(tokenA) == selectedTokenId ? -1 : 0,
    );

  const withFilterByChain = (tokens: SelectedToken[]) =>
    selectedChainId
      ? tokens.filter(
          (token) =>
            selectedChainId ===
            (token.isCrypto ? token.chain.id : FIAT_CHAIN_ID),
        )
      : tokens;

  const withFilterBySymbol = (tokens: SelectedToken[]) =>
    debouncedSearchToken
      ? tokens.filter(({ symbol }) =>
          symbol?.toLowerCase().includes(debouncedSearchToken.toLowerCase()),
        )
      : tokens;

  const filteredTokens = React.useMemo(() => {
    if (!debouncedSearchToken) {
      return withSortPositiveBalance(
        withFilterByChain(withSortSelected(withSortNativeTokens(tokens))),
      );
    }

    return withSortPositiveBalance(
      withFilterByChain(
        withFilterBySymbol(withSortSelected(withSortNativeTokens(tokens))),
      ),
    );
  }, [debouncedSearchToken, tokens, selectedChainId, tokenBalances]);

  const isEmptyFilteredTokens =
    filteredTokens.length < 1 && debouncedSearchToken;

  return {
    filteredTokens,
    isEmptyFilteredTokens,
    setSearchToken,
    searchToken,
    withSortSelected,
  };
};
