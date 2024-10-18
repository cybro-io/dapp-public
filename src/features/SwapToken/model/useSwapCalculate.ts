import React from 'react';

import { utils } from 'ethers';
import {
  Token,
  TokenAmount,
  SwapExactInResult,
  SwapExactInParams,
} from 'symbiosis-js-sdk';

import { useSymbiosis } from '@/shared/lib';

import { getSwapExactError } from '../helpers/getSwapExactError';
import { prepareCalculateParams } from '../helpers/prepareCalculateParams';

export type SwapCalculateResult = SwapExactInResult & {
  tokenAmountIn: TokenAmount;
  from: string;
};

interface SwapCalculateData {
  records: Record<string, { title: string; value: string }>;
  isLoadingCalculate: boolean;
  error?: string;
  calculate?: SwapCalculateResult;
}

type CalculateSwapProps = Pick<
  SwapExactInParams,
  'tokenOut' | 'from' | 'to' | 'slippage' | 'deadline'
> & {
  tokenIn: Token;
  amount: string;
};

export const useSwapCalculate = () => {
  const symbiosis = useSymbiosis();

  const [calculateData, setCalculateData] = React.useState<SwapCalculateData>({
    isLoadingCalculate: false,
    records: {},
  });

  const setCalculateDataWithPrev = (props: Partial<SwapCalculateData>) =>
    setCalculateData((prevState) => ({ ...prevState, ...props }));

  const resetCalculate = (props: Partial<SwapCalculateData>) =>
    setCalculateData({
      records: {},
      error: undefined,
      isLoadingCalculate: false,
      calculate: undefined,
      ...props,
    });

  const fetchCalculateSwap = async (props: CalculateSwapProps) => {
    try {
      const { amount, from, to, tokenOut, tokenIn, slippage, deadline } = props;

      resetCalculate({ isLoadingCalculate: true });

      const tokenAmountIn = new TokenAmount(
        tokenIn,
        utils.parseUnits(amount, tokenIn.decimals).toString(),
      );

      if (!utils.isAddress(to) || !utils.isAddress(from)) {
        throw new Error('Incorrect address');
      }

      const exactIn = await symbiosis.swapExactIn({
        inTokenAmount: tokenAmountIn,
        outToken: tokenOut,
        fromAddress: from,
        toAddress: to,
        slippage: slippage * 100,
        deadline: Date.now() + deadline * 60,
      });

      const data = {
        calculate: { ...exactIn, tokenAmountIn, from },
        records: prepareCalculateParams(exactIn),
        isLoadingCalculate: false,
        error: undefined,
      };

      setCalculateDataWithPrev(data);

      return data;
    } catch (error) {
      console.error(error);
      resetCalculate({ error: getSwapExactError(error) });

      return getSwapExactError(error);
    }
  };

  return { ...calculateData, fetchCalculateSwap, resetCalculate };
};
