import React from 'react';

import { getChainById } from '@lifi/data-types';

import { links, swapChains } from '@/shared/lib';

import { SelectedChain } from './types';

export const FIAT_CHAIN_ID = -1;

export const useSwapChainsList = (withFiat = false) => {
  const chains: SelectedChain[] = React.useMemo(() => {
    const cryptoChains = swapChains.map(({ name, id }) => {
      const chain = getChainById(Number(id));

      return {
        name,
        logoUrl: chain.logoURI ?? links.noImage,
        isCrypto: true,
        id,
      };
    }) as SelectedChain[];

    if (withFiat) {
      cryptoChains.push({
        name: 'Fiat',
        logoUrl: '/fiat.svg',
        isCrypto: false,
        id: FIAT_CHAIN_ID,
      });
    }

    return cryptoChains;
  }, [withFiat]);

  return { chains };
};
