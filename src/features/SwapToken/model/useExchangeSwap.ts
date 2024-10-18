import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { utils } from 'ethers';
import {
  ChainId,
  getTokenAmountUsd,
  getTokenPriceUsd,
  TokenAmount,
} from 'symbiosis-js-sdk';

import { useSwapTokens } from '@/entities/SwapToken';
import { useWeb3ModalAccount } from '@/shared/lib';
import { SentSuccessModal } from '@/shared/ui';

import { useExchangeSwapForm } from '../model/useExchangeSwapForm';

import { useSwap } from './useSwap';
import { useSwapCalculate } from './useSwapCalculate';

export const useExchangeSwap = () => {
  const { address: defaultAddress, isConnected } = useWeb3ModalAccount();

  const { tokens } = useSwapTokens();
  const calculateParams = useSwapCalculate();

  const {
    fetchCalculateSwap,
    error,
    calculate,
    isLoadingCalculate,
    resetCalculate,
  } = calculateParams;

  const { swap, isLoadingSwap, subscribeSuccessSwap } = useSwap();

  const form = useExchangeSwapForm({
    initialTokenIn:
      tokens.find(
        ({ symbol, chainId }) =>
          symbol === 'USDB' && chainId === ChainId.BLAST_MAINNET,
      ) ?? tokens[0],
    initialTokenOut:
      tokens.find(
        ({ symbol, chainId }) =>
          symbol === 'ETH' && chainId === ChainId.BLAST_MAINNET,
      ) ?? tokens[0],
    onCalculate: () => handleCalculateSwap(),
    onSubmit: async () => {
      if (error || !calculate) return;
      swap(calculate);
      resetCalculate({});
      form.setAmountOut('');
      form.setAmountIn('');
    },
  });

  const {
    slippage,
    deadline,
    tokenIn,
    tokenOut,
    amountIn,
    amountOut,
    priceOutUsd,
    priceInUsd,
  } = form.values;

  // Amount usd from
  const amountInUsd = React.useMemo(() => {
    if (!tokenIn || !priceInUsd || Number(amountIn) <= 0) return null;

    const tokenAmount = new TokenAmount(
      tokenIn,
      utils.parseUnits(String(amountIn), tokenIn.decimals).toString(),
    );

    return getTokenAmountUsd(tokenAmount, priceInUsd);
  }, [tokenIn, priceInUsd, amountIn]);

  // Amount usd to
  const amountOutUsd = React.useMemo(() => {
    if (!tokenOut || !priceOutUsd || Number(amountOut) <= 0) return null;

    const tokenAmount = new TokenAmount(
      tokenOut,
      utils.parseUnits(String(amountOut), tokenOut.decimals).toString(),
    );

    return getTokenAmountUsd(tokenAmount, priceOutUsd);
  }, [tokenOut, priceOutUsd, amountOut]);

  // Reset calculate
  React.useEffect(() => {
    resetCalculate({});
    form.setAmountOut('');
  }, [tokenIn, tokenOut]);

  // Calculate swap
  const handleCalculateSwap = () => {
    if (!defaultAddress) return;

    fetchCalculateSwap({
      tokenIn,
      tokenOut,
      to: String(form.debouncedAddress || defaultAddress),
      from: defaultAddress ?? '',
      amount: String(form.debouncedAmountIn),
      slippage,
      deadline,
    }).then((data) => {
      if (typeof data !== 'string') {
        form.setAmountOut(data.calculate.tokenAmountOut.toSignificant() ?? '0');
      }
    });
  };

  React.useEffect(() => {
    getTokenPriceUsd(tokenOut)
      .then(form.setPriceOutUsd)
      .catch(form.setPriceOutUsd);
    getTokenPriceUsd(tokenIn)
      .then(form.setPriceInUsd)
      .catch(form.setPriceInUsd);

    const subscription = subscribeSuccessSwap(
      ({ tokenAmountOut, tokenAmountIn }) => {
        NiceModal.show(SentSuccessModal, {
          sentSymbol: tokenAmountIn.token.symbol,
          sentAmount: tokenAmountIn.toSignificant(),
          receivedSymbol: tokenAmountOut.token.symbol,
          receivedAmount: tokenAmountOut.toSignificant(),
          primaryActionName: 'To home page',
          title: 'Swap',
        }).then();
      },
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const isDisabledSubmit =
    isLoadingCalculate || isLoadingSwap || !form.isValid || Boolean(error);
  const isDisabledInputValue = isLoadingCalculate || isLoadingSwap;

  return {
    isConnected,
    amountInUsd,
    amountOutUsd,
    isDisabledSubmit,
    form,
    calculateParams,
    isDisabledInputValue,
  };
};
