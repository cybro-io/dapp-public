import React from 'react';

import { useSwapChains } from '@/entities/SwapToken';
import { links } from '@/shared/lib';

import { SelectedChain } from './types';

export const FIAT_CHAIN_ID = -1;

export const useSwapChainsList = (withFiat = false) => {
  const swapChains = useSwapChains();

  const chains: SelectedChain[] = React.useMemo(() => {
    const cryptoChains = swapChains.map(({ name, icons, id }) => ({
      name,
      logoUrl: icons.small ?? links.noImage,
      isCrypto: true,
      id,
    })) as SelectedChain[];

    if (withFiat) {
      cryptoChains.unshift({
        name: 'Fiat',
        logoUrl: '/fiat.svg',
        isCrypto: false,
        id: FIAT_CHAIN_ID,
      });
    }

    return cryptoChains;
  }, [swapChains, withFiat]);

  return { chains };
};
