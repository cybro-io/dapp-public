import React, { useMemo } from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { ChainId } from '@lifi/sdk';
import BigNumber from 'bignumber.js';
import { utils } from 'ethers';
import { cloneDeep } from 'lodash';
import { zeroAddress } from 'viem';

import { liFiDefaultRouteOptions } from '@/entities/LiFi';
import { useSwapTokens } from '@/entities/SwapToken';
import {
  getLiFiErrorMessage,
  useZapIn,
  useZapInCalculate,
} from '@/features/ZapInToken';
import { triggerToast, useAppKitAccount } from '@/shared/lib';
import { SentSuccessModal, ToastType } from '@/shared/ui';

import { useExchangeSwapForm } from '../model/useExchangeSwapForm';
import { WaitForCompleteModal } from '../ui/WaitForCompleteModal';

export const useExchangeSwap = () => {
  const { address: defaultAddress, isConnected } = useAppKitAccount();

  const { findToken, findTokenBySymbol } = useSwapTokens();

  const calculateParams = useZapInCalculate();

  const {
    fetchCalculate,
    result: resultCalculate,
    isLoading: isLoadingCalculate,
    resetCalculate,
  } = calculateParams;

  const { executeZapIn, isLoading: isLoadingZapIn } = useZapIn();

  const initialTokenIn = useMemo(
    () => findTokenBySymbol('USDC', ChainId.BAS) ?? null,
    [findTokenBySymbol],
  );

  const initialTokenOut = useMemo(
    () => findTokenBySymbol('ETH', ChainId.BAS) ?? null,
    [findTokenBySymbol],
  );

  const form = useExchangeSwapForm({
    initialTokenIn,
    initialTokenOut,
    onCalculate: () => handleCalculateSwap(),
    onSubmit: async () => {
      if (!resultCalculate) {
        return;
      }

      const cloneResult = cloneDeep(resultCalculate);

      executeZapIn({
        route: resultCalculate,
        onSuccess: () => {
          NiceModal.show(SentSuccessModal, {
            sentSymbol: cloneResult.fromToken.symbol,
            sentAmount: utils.formatUnits(
              cloneResult.fromAmount,
              cloneResult.fromToken.decimals,
            ),
            receivedSymbol: cloneResult.toToken.symbol,
            receivedAmount: utils.formatUnits(
              cloneResult.toAmount,
              cloneResult.toToken.decimals,
            ),
            primaryActionName: 'To home page',
            title: 'Swap',
          }).then();
        },
      }).finally(() => {
        resetCalculate();
        form.setAmountOut('');
        form.setAmountIn('');
      });

      NiceModal.show(WaitForCompleteModal);
    },
  });

  const {
    slippage,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    address: toAddress,
  } = form.values;

  // Amount usd from
  const amountInUsd = React.useMemo(() => {
    if (!tokenIn || Number(amountIn) <= 0) {
      return null;
    }

    const tokenAmount = new BigNumber(amountIn);

    return tokenAmount.multipliedBy(tokenIn.priceUSD).toString();
  }, [tokenIn, amountIn]);

  // Amount usd to
  const amountOutUsd = React.useMemo(() => {
    if (!tokenOut || Number(amountOut) <= 0) {
      return null;
    }

    const tokenAmount = new BigNumber(amountOut);

    return tokenAmount.multipliedBy(tokenOut.priceUSD).toString();
  }, [tokenOut, amountOut]);

  // Reset calculate
  React.useEffect(() => {
    resetCalculate();
    form.setAmountOut('');
  }, [tokenIn, tokenOut]);

  // Calculate swap
  const handleCalculateSwap = async () => {
    if (!defaultAddress || !tokenOut || !tokenIn) return;

    try {
      const route = await fetchCalculate({
        fromChainId: tokenIn.chainId,
        toChainId: tokenOut.chainId,
        fromTokenAddress: tokenIn.address ? tokenIn.address : zeroAddress,
        toTokenAddress: tokenOut.address ? tokenOut.address : zeroAddress,
        fromAmount: utils.parseUnits(amountIn, tokenIn.decimals).toString(),
        fromAddress: defaultAddress,
        toAddress: toAddress || defaultAddress,
        options: {
          ...liFiDefaultRouteOptions,
          slippage: slippage / 100,
        },
      });

      if (route) {
        const normalizedAmount = new BigNumber(
          utils.formatUnits(route.toAmount, route.toToken.decimals),
        )
          .dp(8)
          .toString();

        form.setAmountOut(normalizedAmount);
      }
    } catch (error) {
      const description = getLiFiErrorMessage(error);

      triggerToast({
        message: `Something went wrong`,
        description,
        type: ToastType.Error,
      });
    }
  };

  const isDisabledSubmit =
    isLoadingCalculate || isLoadingZapIn || !form.isValid;
  const isDisabledInputValue = isLoadingCalculate || isLoadingZapIn;

  return {
    isConnected,
    amountInUsd,
    amountOutUsd,
    isDisabledSubmit,
    form,
    calculateParams,
    isDisabledInputValue,
    findToken,
  };
};
