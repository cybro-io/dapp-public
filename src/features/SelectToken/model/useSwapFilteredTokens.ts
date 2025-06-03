import React from 'react';

import { useDebounceValue } from 'usehooks-ts';

import { SelectedToken } from '@/entities/fund';
import { getUniqueSelectedTokenId } from '@/entities/SwapToken';
import { useWalletBalances } from '@/entities/WalletBalance';
import { useGetSelectedChain } from '@/features/SelectToken';
import { FIAT_CHAIN_ID } from '@/features/SelectToken/model/useSwapChains';

export const useSwapFilteredTokens = (
  tokens: SelectedToken[],
  selectedTokenId: string,
  nativeTokensId: string[],
) => {
  const selectedChainId = useGetSelectedChain();

  const { findBalanceByToken, walletBalances } = useWalletBalances();

  const [searchToken, setSearchToken] = React.useState('');
  const [debouncedSearchToken] = useDebounceValue(searchToken, 500);

  const withSortNativeTokens = (tokens: SelectedToken[]) =>
    tokens.sort((tokenA) =>
      nativeTokensId.includes(getUniqueSelectedTokenId(tokenA)) ? -1 : 0,
    );

  const withSortPositiveBalance = (tokens: SelectedToken[]) =>
    tokens.sort((tokenA, tokenB) => {
      if (!tokenA.isCrypto || !tokenB.isCrypto) return 0;

      return tokenA.isCrypto &&
        tokenB.isCrypto &&
        Number(findBalanceByToken(tokenA.chain.id, tokenA.address)) >
          Number(findBalanceByToken(tokenB.chain.id, tokenB.address))
        ? -1
        : 0;
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
      return withFilterByChain(
        withSortSelected(withSortNativeTokens(withSortPositiveBalance(tokens))),
      );
    }

    return withFilterByChain(withFilterBySymbol(withSortSelected(tokens)));
  }, [debouncedSearchToken, tokens, selectedChainId, walletBalances]);

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
