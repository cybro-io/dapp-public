import React from 'react';

import { createEffect, createEvent, createStore } from 'effector';

import { getProviderByChainId } from '@/entities/LiFi';
import { createTokenContract, getTokenPriceUsd } from '@/shared/lib';
import { getPriceApiV1MarketDataPriceGet } from '@/shared/types';

/**
 * CoinGecko token price in USD with cache
 */

interface TokenPrice {
  timestamp: number;
  price: number;
}

interface IFetchTokenPriceUsdFxData {
  chainId: number;
  tokenAddress: string;
}

interface NewTokenPrice extends IFetchTokenPriceUsdFxData {
  price: number;
}

type TokenPrices = Record<number, Record<string, TokenPrice>>;
const CACHE_TIME = 5 * 60 * 1000; // 5min
const applyPrice = (state: TokenPrices, newPrice: NewTokenPrice) => {
  return {
    ...state,
    [newPrice.chainId]: {
      ...state[newPrice.chainId],
      [newPrice.tokenAddress]: {
        price: newPrice.price,
        timestamp: Date.now() + CACHE_TIME,
      },
    },
  };
};

const $tokenPrices = createStore<TokenPrices>({});

export const fetchTokenPriceUsdFx = createEffect<
  IFetchTokenPriceUsdFxData,
  number
>(async ({ chainId, tokenAddress }) => {
  const tokenPrices = $tokenPrices.getState();

  if (tokenPrices[chainId]) {
    const tokenPrice = tokenPrices[chainId][tokenAddress];

    if (tokenPrice && tokenPrice.timestamp >= Date.now()) {
      return tokenPrice.price;
    }
  }

  let price: number | null = null;

  const provider = getProviderByChainId(chainId);
  if (provider) {
    const tokenContract = createTokenContract(tokenAddress, provider);
    const symbol = await tokenContract.symbol();

    const result = await getPriceApiV1MarketDataPriceGet({
      token: symbol,
      chain_id: chainId,
    });

    if (result.data) {
      price = Number(result.data.data?.price) || null;
    }
  }

  if (!price) {
    price = await getTokenPriceUsd(chainId, tokenAddress);
  }

  updatePrice({
    chainId,
    tokenAddress,
    price,
  });

  return price;
});

const updatePrice = createEvent<NewTokenPrice>();
$tokenPrices.on(updatePrice, (state, newPrice) => applyPrice(state, newPrice));

export const useTokenPriceUsd = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [price, setPrice] = React.useState(0);

  const fetchPrice = (data: IFetchTokenPriceUsdFxData) => {
    setIsLoading(true);
    fetchTokenPriceUsdFx(data)
      .then(setPrice)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { fetchPrice, isLoading, price };
};

$tokenPrices.watch((state) => console.log(state));
