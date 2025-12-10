'use client';

import { useCallback, useMemo } from 'react';

import {
  ChainId,
  ChainType,
  getTokenBalancesByChain,
  getTokens,
} from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { utils } from 'ethers';
import { maxBy } from 'lodash';

import { swapChains } from '@/shared/lib';
import { Nullable, TokenAmountUSD } from '@/shared/types';

import { useAppKitAccount } from './useAppKitAccount';

export const useTokenBalancesByChain = () => {
  const { address, status, isConnected, isLoadingAccount } = useAppKitAccount();

  const {
    data: tokenBalances,
    isLoading,
    isFetched,
  } = useQuery({
    queryFn: async () => {
      const tokensResponse = await getTokens({
        chains: swapChains.map((chain) => chain.id as ChainId),
        chainTypes: [ChainType.EVM],
      });

      const response = await getTokenBalancesByChain(
        address!,
        tokensResponse.tokens,
      );

      const tokensWithPositiveBalance = Object.values(response)
        .flat()
        .filter((tokenAmount) => (tokenAmount?.amount ?? 0) > 0)
        .map((tokenAmount) => ({
          ...tokenAmount,
          amountUSD: new BigNumber(tokenAmount.priceUSD)
            .multipliedBy(
              utils.formatUnits(
                tokenAmount.amount ?? '0',
                tokenAmount.decimals,
              ),
            )
            .toString(),
        }));

      return tokensWithPositiveBalance as TokenAmountUSD[];
    },
    queryKey: ['tokenBalancesByChain', address],
    enabled: Boolean(address),
    refetchInterval: 60_000,
    staleTime: 10_000,
  });

  const findBalanceByToken = useCallback(
    (chainId: ChainId, tokenAddress: Nullable<string>) => {
      if (typeof tokenAddress !== 'string' || !tokenBalances) {
        return null;
      }

      return (
        tokenBalances.find(
          (token) =>
            token.chainId === chainId &&
            token.address.toLowerCase() === tokenAddress.toLowerCase(),
        ) ?? null
      );
    },
    [tokenBalances],
  );

  const highestToken = useMemo(() => {
    return maxBy(tokenBalances, (tokenAmount) =>
      new BigNumber(tokenAmount.amountUSD).toNumber(),
    );
  }, [tokenBalances]);

  return {
    findBalanceByToken,
    highestToken,
    isLoading: isLoading || (!isFetched && isLoadingAccount),
    tokenBalances,
  };
};
