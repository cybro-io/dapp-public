import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { utils } from 'ethers';

import { getProviderByChainId } from '@/entities/LiFi';
import { QueryKey } from '@/shared/const';
import { createExchangeContract } from '@/shared/lib';

import { cybroContractAddress } from '../constants/cybro';

const CYBRO_PRICE_CACHE_DURATION = 30000; // in milliseconds

export const useCybroPrice = () => {
  const { data, dataUpdatedAt, ...query } = useQuery({
    queryFn: async () => {
      const provider = getProviderByChainId(ChainId.BLS);

      if (!provider) {
        return defaultPrice;
      }

      const exchangeContract = createExchangeContract(
        cybroContractAddress.exchange,
        provider,
      );

      const price = await exchangeContract.getCybroPrice();

      return utils.formatUnits(price);
    },
    staleTime: CYBRO_PRICE_CACHE_DURATION,
    refetchInterval: CYBRO_PRICE_CACHE_DURATION,
    queryKey: [QueryKey.CybroPrice],
    placeholderData: defaultPrice,
  });

  return { price: data ?? defaultPrice, ...query };
};

const defaultPrice = '0' as string;
