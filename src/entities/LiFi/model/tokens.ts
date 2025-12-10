'use client';

import { ChainType, getTokens, Token, TokensResponse } from '@lifi/sdk';
import { createStore, sample } from 'effector';
import { createEffect } from 'effector/compat';
import { useUnit } from 'effector-react';

export const lifiTokensByChain = createStore<TokensResponse['tokens']>({});
export const lifiTokens = createStore<Token[]>([]);

lifiTokens.on(lifiTokensByChain, (_, payload) =>
  Object.values(payload).flatMap((value) => value),
);

const getTokensFx = createEffect(() =>
  getTokens({ chainTypes: [ChainType.EVM] }).then(({ tokens }) => tokens),
);

sample({
  clock: getTokensFx.doneData,
  target: lifiTokensByChain,
});

getTokensFx();

export const useLifiTokens = () => {
  return useUnit({
    tokensByChain: lifiTokensByChain,
    tokens: lifiTokens,
    isLoading: getTokensFx.pending,
  });
};
