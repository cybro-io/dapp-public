'use client';

import { ChainType, ExtendedChain, getChains } from '@lifi/sdk';
import { createStore, sample } from 'effector';
import { createEffect } from 'effector/compat';
import { useUnit } from 'effector-react';

export const lifiChains = createStore<ExtendedChain[]>([]);

const getChainsFx = createEffect(() =>
  getChains({ chainTypes: [ChainType.EVM] }),
);

sample({
  clock: getChainsFx.doneData,
  target: lifiChains,
});

getChainsFx();

export const useLifiChains = () => {
  return useUnit({ chains: lifiChains, isLoading: getChainsFx.pending });
};
