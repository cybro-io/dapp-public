import React from 'react';

import { createEvent, createStore, sample } from 'effector';
import { useUnit } from 'effector-react';
import { Chain, ChainId } from 'symbiosis-js-sdk';
import { useDebounceValue } from 'usehooks-ts';

import { useSwapChains } from '@/entities/SwapToken';

const $selectedChain = createStore<ChainId | null>(null);
const setSelectedChain = createEvent<ChainId | null>();

sample({
  clock: setSelectedChain,
  target: $selectedChain,
});

export const useSelectChain = () => {
  const unit = useUnit({
    selectedChain: $selectedChain,
    setSelectedChain,
  });

  const swapChains = useSwapChains();

  const [searchChain, setSearchChain] = React.useState('');
  const [debouncedSearchChain] = useDebounceValue(searchChain, 500);

  const chainsWithSorted = (chains: Chain[]) =>
    chains
      .sort((chainA, chainB) => (chainA.name < chainB.name ? -1 : 1))
      .sort((chain) =>
        chain.name.toLowerCase() === 'ethereum' ||
        chain.name.toLowerCase() === 'blast'
          ? -1
          : 0,
      );

  const filteredChains = React.useMemo(() => {
    const sortedChains = chainsWithSorted(swapChains);

    return debouncedSearchChain
      ? sortedChains.filter((chain) =>
          chain.name.toLowerCase().includes(debouncedSearchChain.toLowerCase()),
        )
      : sortedChains;
  }, [swapChains, debouncedSearchChain]);

  const registerSearchChain = () => ({
    value: searchChain,
    onValueChange: setSearchChain,
  });

  const isEmptyFilteredChains =
    filteredChains.length < 1 && debouncedSearchChain;

  return {
    ...unit,
    chains: filteredChains,
    registerSearchChain,
    isEmptyFilteredChains,
  };
};
