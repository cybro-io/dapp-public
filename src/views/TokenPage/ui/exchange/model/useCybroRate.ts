import React from 'react';

import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { utils } from 'ethers';
import { useInterval } from 'usehooks-ts';

import { getProviderByChainId } from '@/shared/lib';
import { QueryKey } from '@/shared/lib';
import { createExchangeContract } from '@/shared/lib';

import { cybroContractAddress } from '../constants/cybro';

const CYBRO_CACHE_DURATION = 30000; // in milliseconds

export const useCybroRate = () => {
  const { data, dataUpdatedAt, ...query } = useQuery({
    queryFn: async () => {
      const provider = getProviderByChainId(ChainId.BLS);

      if (!provider) {
        return defaultPrices;
      }

      const exchangeContract = createExchangeContract(
        cybroContractAddress.exchange,
        provider,
      );

      const buyPrice = await exchangeContract.getPriceWithSpread(true);
      const sellPrice = await exchangeContract.getPriceWithSpread(false);

      return {
        sell: utils.formatUnits(sellPrice),
        buy: utils.formatUnits(buyPrice),
      };
    },
    staleTime: CYBRO_CACHE_DURATION,
    refetchInterval: CYBRO_CACHE_DURATION,
    queryKey: [QueryKey.CybroRate],
    placeholderData: defaultPrices,
  });

  const [duration, setDuration] = React.useState(0);
  useInterval(() => {
    const diff = dayjs(dataUpdatedAt + CYBRO_CACHE_DURATION).diff();
    setDuration(diff < 0 ? 0 : diff);
  }, 1000);

  return { cybroRate: data ?? defaultPrices, duration, ...query };
};

const defaultPrices = {
  sell: '0',
  buy: '0',
};
