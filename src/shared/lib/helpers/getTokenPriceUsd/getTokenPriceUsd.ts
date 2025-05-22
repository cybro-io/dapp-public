import { BigNumberish, constants } from 'ethers';
import { ChainId } from 'symbiosis-js-sdk';

import { COINGECKO_GAS_TOKEN_IDS, COINGECKO_PLATFORMS } from './constants';

const getGasTokenPrice = async (chainId: number): Promise<number> => {
  if (!(chainId in COINGECKO_GAS_TOKEN_IDS)) {
    console.error('CoinGecko: invalid chainId');
    return 0;
  }

  const ids = COINGECKO_GAS_TOKEN_IDS[chainId as ChainId] as string;

  const vsCurrencies = 'usd';
  const API_URL = 'https://api.coingecko.com';
  const url = new URL(`/api/v3/simple/price`, API_URL);

  url.searchParams.set('ids', ids);
  url.searchParams.set('vs_currencies', vsCurrencies);

  const response = await fetch(url.toString());

  if (!response.ok) {
    console.error('CoinGecko: failed to get gas token price');
    return 0;
  }

  const json = await response.json();

  if (!json[ids]) {
    console.error('CoinGecko: cannot find address');
    return 0;
  }

  return parseFloat(json[ids][vsCurrencies]);
};

const getTokenPrice = async (
  chainId: number,
  tokenAddress: string,
): Promise<number> => {
  if (!(chainId in COINGECKO_GAS_TOKEN_IDS)) {
    console.error('CoinGecko: cannot find asset platform');
    return 0;
  }
  const platform = COINGECKO_PLATFORMS[chainId as ChainId] as string;
  const address = tokenAddress.toLowerCase();

  const vsCurrencies = 'usd';
  const API_URL = 'https://api.coingecko.com';
  const url = new URL(`/api/v3/simple/token_price/${platform}`, API_URL);
  url.searchParams.set('contract_addresses', address);
  url.searchParams.set('vs_currencies', vsCurrencies);

  const response = await fetch(url.toString());

  if (!response.ok) {
    console.error('CoinGecko: failed to get token price');
    return 0;
  }

  const json = await response.json();

  if (!json[address]) {
    console.error('CoinGecko: cannot find address');
    return 0;
  }

  return parseFloat(json[address][vsCurrencies]);
};

export const getTokenPriceUsd = async (
  chainId: number,
  tokenAddress?: string,
) => {
  if (!tokenAddress || tokenAddress === constants.AddressZero) {
    return getGasTokenPrice(chainId);
  }

  return getTokenPrice(chainId, tokenAddress);
};

export const getTokenAmountUsd = (
  amount: BigNumberish,
  price: number,
): number => {
  return parseFloat((parseFloat(amount.toString()) * price).toFixed(2));
};
