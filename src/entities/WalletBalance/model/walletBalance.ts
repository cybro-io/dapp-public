import { createEffect, createEvent, createStore, sample } from 'effector';
import { useUnit } from 'effector-react';
import { ChainId, isBtc, isTronChainId, Token } from 'symbiosis-js-sdk';

import {
  $symbiosis,
  getEthGasBalanceByChain,
  getEthTokensBalanceByChain,
} from '@/shared/lib';

type GetWalletBalancesProps = {
  address: string;
  tokens: Token[];
};

export const $walletBalances = createStore<
  Map<ChainId, Record<string, string>>
>(new Map<ChainId, Record<string, string>>());

const getWalletBalances = createEvent<GetWalletBalancesProps>();

const getWalletBalancesFunc = async ({
  address,
  tokens,
}: GetWalletBalancesProps) => {
  try {
    const symbiosis = $symbiosis.getState();

    const chains = symbiosis
      .chains()
      .filter((chain) => !isBtc(chain.id) && !isTronChainId(chain.id));

    const promises = chains.map((chain) =>
      getEthTokensBalanceByChain(
        chain.id,
        address,
        tokens.filter((token) => token.chainId === chain.id && token.address),
      ),
    );

    const balances = await Promise.all(promises);

    const map = new Map<ChainId, Record<string, string>>();

    balances.forEach((balance) => {
      Object.entries(balance).forEach(([key, value]) => {
        map.set(Number(key) as unknown as ChainId, value);
      });
    });

    return map;
  } catch (e) {
    return new Map<ChainId, Record<string, string>>();
  }
};

const getWalletBalancesFx = createEffect('getWalletBalancesFx', {
  handler: getWalletBalancesFunc,
});

export const useWalletBalances = () => {
  const units = useUnit({
    walletBalances: $walletBalances,
    getWalletBalances,
    isLoadingWalletBalances: getWalletBalancesFx.pending,
  });

  const findBalanceByToken = (chainId: ChainId, address = '') => {
    const chainsBalances = units.walletBalances.get(chainId);
    if (!chainsBalances) return '0.0';

    return address in chainsBalances ? chainsBalances[address] : '0.0';
  };

  return { ...units, findBalanceByToken };
};

sample({
  clock: getWalletBalances,
  target: getWalletBalancesFx,
});

sample({
  clock: getWalletBalancesFx.doneData,
  target: $walletBalances,
});
