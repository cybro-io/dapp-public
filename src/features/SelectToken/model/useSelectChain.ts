import React from 'react';

import { createEvent, createStore, sample } from 'effector';
import { useUnit } from 'effector-react';
import { useDebounceValue } from 'usehooks-ts';

import { SelectedChain } from './types';

const $selectedChain = createStore<number>(0);
const setSelectedChain = createEvent<number>();

sample({
  clock: setSelectedChain,
  target: $selectedChain,
});

export const useGetSelectedChain = () => useUnit($selectedChain);

export const useSelectChain = (defaultChains: SelectedChain[]) => {
  const unit = useUnit({
    selectedChain: $selectedChain,
    setSelectedChain,
  });

  const [searchChain, setSearchChain] = React.useState('');
  const [debouncedSearchChain] = useDebounceValue(searchChain, 500);

  const chainsWithSorted = (chains: SelectedChain[]) =>
    chains
      .sort((chainA, chainB) => (chainA.name < chainB.name ? -1 : 1))
      .sort((chain) =>
        chain.name.toLowerCase() === 'fiat' ||
        chain.name.toLowerCase() === 'ethereum' ||
        chain.name.toLowerCase() === 'blast'
          ? -1
          : 0,
      );

  const filteredChains = React.useMemo(() => {
    const sortedChains = chainsWithSorted(defaultChains);

    return debouncedSearchChain
      ? sortedChains.filter((chain) =>
          chain.name.toLowerCase().includes(debouncedSearchChain.toLowerCase()),
        )
      : sortedChains;
  }, [defaultChains, debouncedSearchChain]);

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
