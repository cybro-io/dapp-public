import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';
import { utils } from 'ethers';

import { getProviderByChainId } from '@/shared/lib';
import { QueryKey } from '@/shared/lib';
import { createExchangeContract } from '@/shared/lib';

import { cybroContractAddress } from '../constants/cybro';

export const useExchangePool = () => {
  const { data, ...query } = useQuery({
    queryFn: async () => {
      const provider = getProviderByChainId(ChainId.BLS);

      if (!provider) {
        return defaultPool;
      }

      const exchangeContract = createExchangeContract(
        cybroContractAddress.exchange,
        provider,
      );

      const cybroMaxAmount = await exchangeContract.maxAmountToBuy();
      const usdbMaxAmount = await exchangeContract.maxAmountToSell(true);
      const wethMaxAmount = await exchangeContract.maxAmountToSell(false);

      return {
        buy: utils.formatUnits(cybroMaxAmount),
        sellUSDB: utils.formatUnits(usdbMaxAmount),
        sellWETH: utils.formatUnits(wethMaxAmount),
      };
    },
    refetchInterval: 20000,
    queryKey: [QueryKey.ExchangePool],
  });

  const maxAmount = data ?? defaultPool;

  const isMaxAmountZero =
    new BigNumber(maxAmount.buy)
      .plus(maxAmount.sellUSDB)
      .plus(maxAmount.sellWETH)
      .isZero() && !query.isPending;

  return { maxAmount, isMaxAmountZero, ...query };
};

const defaultPool = {
  buy: '0',
  sellUSDB: '0',
  sellWETH: '0',
};
