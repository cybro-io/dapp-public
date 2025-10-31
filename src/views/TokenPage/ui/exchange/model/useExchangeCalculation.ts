import { ChainId } from '@lifi/sdk';
import { DefaultError, useMutation } from '@tanstack/react-query';
import { utils } from 'ethers';

import { getProviderByChainId } from '@/shared/lib';
import { createExchangeContract } from '@/shared/lib';

import { cybroContractAddress } from '../constants/cybro';

import { ExchangeDirection } from './types';

interface UseExchangeCalculationProps {
  amount: string;
  direction: ExchangeDirection;
  usdbOrWeth: boolean;
}

export const useExchangeCalculation = () => {
  return useMutation<string, DefaultError, UseExchangeCalculationProps>({
    mutationFn: async ({ amount, direction, usdbOrWeth }) => {
      const provider = getProviderByChainId(ChainId.BLS);

      if (!provider || !amount) {
        return defaultAmount;
      }

      const weiAmount = utils.parseUnits(amount);

      const exchangeContract = createExchangeContract(
        cybroContractAddress.exchange,
        provider,
      );

      if (direction === ExchangeDirection.buy) {
        const amountBuy = await exchangeContract.viewBuyByToken(
          weiAmount.toString(),
          usdbOrWeth,
        );
        return utils.formatUnits(amountBuy);
      }

      const amountSell = await exchangeContract.viewSellByCybro(
        weiAmount.toString(),
        usdbOrWeth,
      );

      return utils.formatUnits(amountSell);
    },
  });
};

const defaultAmount = '0' as string;
