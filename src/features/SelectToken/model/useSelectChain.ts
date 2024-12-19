import React from 'react';

import { createEvent, createStore, sample } from 'effector';
import { useUnit } from 'effector-react';
import { useDebounceValue } from 'usehooks-ts';

import { useSwapChains } from '@/entities/SwapToken';
import { links } from '@/shared/lib';

const $selectedChain = createStore<string | null>(null);
const setSelectedChain = createEvent<string | null>();

interface SelectedChain {
  isCrypto: boolean;
  name: string;
  logoUrl: string;
}

sample({
  clock: setSelectedChain,
  target: $selectedChain,
});

export const useSelectChain = (withFiat?: boolean) => {
  const unit = useUnit({
    selectedChain: $selectedChain,
    setSelectedChain,
  });

  const swapChains = useSwapChains();

  const chains: SelectedChain[] = React.useMemo(() => {
    const cryptoChains = swapChains.map(({ name, icons }) => ({
      name,
      logoUrl: icons.small ?? links.noImage,
      isCrypto: true,
    }));

    if (withFiat) {
      cryptoChains.unshift({
        name: 'Fiat',
        logoUrl: '/fiat.svg',
        isCrypto: false,
      });
    }

    return cryptoChains;
  }, [swapChains, withFiat]);

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
    const sortedChains = chainsWithSorted(chains);

    return debouncedSearchChain
      ? sortedChains.filter((chain) =>
          chain.name.toLowerCase().includes(debouncedSearchChain.toLowerCase()),
        )
      : sortedChains;
  }, [chains, debouncedSearchChain]);

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
