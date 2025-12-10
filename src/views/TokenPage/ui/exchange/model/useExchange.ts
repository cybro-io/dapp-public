import React, { useEffect, useMemo } from 'react';

import { useDisclosure } from '@heroui/react';
import { ChainId } from '@lifi/sdk';
import { useAppKitNetwork } from '@reown/appkit/react';
import { useQueryClient } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';
import { useDebounceValue } from 'usehooks-ts';

import { getChain, QueryKey } from '@/shared/lib';
import { useGetErc20Balance, useToast, useAppKitAccount } from '@/shared/lib';
import { ToastType } from '@/shared/ui';
import { formatNumber } from '@/shared/utils';

import { cybroContractAddress } from '../constants/cybro';
import { ExchangeDirection } from '../model/types';
import { useExchangeMutation } from '../model/useExchangeMutation';

import { useCybroRate } from './useCybroRate';
import { useExchangeCalculation } from './useExchangeCalculation';
import { useExchangeForm } from './useExchangeForm';
import { useExchangePool } from './useExchangePool';

export const useExchange = () => {
  const { triggerToast } = useToast();
  const queryClient = useQueryClient();
  const form = useExchangeForm();
  const { maxAmount, isMaxAmountZero } = useExchangePool();

  const { address } = useAppKitAccount();
  const { switchNetwork, chainId } = useAppKitNetwork();

  const { mutateAsync, isPending } = useExchangeMutation();
  const { mutateAsync: mutateCalculationAsync, isPending: isLoadingCalculate } =
    useExchangeCalculation();

  const { balance: cybroBalance, isLoading: isLoadingCybroBalance } =
    useGetErc20Balance({
      tokenAddress: cybroContractAddress.cybro,
      walletAddress: address,
      chainId: ChainId.BLS,
    });

  const { balance: tokenBalance, isLoading: isLoadingTokenBalance } =
    useGetErc20Balance({
      tokenAddress: form.paymentMethod.isCrypto
        ? form.paymentMethod.address
        : null,
      walletAddress: address,
      chainId: ChainId.BLS,
    });

  const { cybroRate, isLoading: isLoadingCybroRate, duration } = useCybroRate();

  const [receive, setReceive] = React.useState('');

  const isInsufficientBalance = React.useMemo(() => {
    if (!form.amount) {
      return false;
    }

    const balance =
      form.direction === ExchangeDirection.buy ? tokenBalance : cybroBalance;

    return new BigNumber(form.amount).isGreaterThan(balance ?? 0);
  }, [form.direction, cybroBalance, tokenBalance, form.amount]);

  const currentMaxAmount = useMemo(() => {
    if (form.direction === ExchangeDirection.buy) {
      return maxAmount.buy;
    }

    return form.paymentMethod.name === 'USDB'
      ? maxAmount.sellUSDB
      : maxAmount.sellWETH;
  }, [form.direction, form.paymentMethod, maxAmount]);

  const isLessAmount = new BigNumber(form.amount ?? 0).isGreaterThan(
    currentMaxAmount,
  );

  const isNeedSwitchNetwork = chainId !== ChainId.BLS;

  const isSubmitDisabled =
    (!form.amount ||
      !form.termsAndConditions ||
      isInsufficientBalance ||
      isPending ||
      isLessAmount ||
      isLoadingCalculate) &&
    !isNeedSwitchNetwork;

  const submitName = React.useMemo(() => {
    if (isNeedSwitchNetwork) {
      return 'Switch network';
    }

    if (isPending) {
      return 'Processing...';
    }

    if (isInsufficientBalance) {
      return 'Insufficient balance';
    }

    if (isLessAmount) {
      return 'More then available amount';
    }

    return null;
  }, [isNeedSwitchNetwork, isInsufficientBalance, isPending, isLessAmount]);

  const usdbOrWeth = form.paymentMethod.name === 'USDB';

  const onSubmit = form.form.handleSubmit((values) => {
    if (isNeedSwitchNetwork) {
      switchNetwork(getChain(ChainId.BLS));
      return;
    }

    const { amount, paymentMethod, direction } = values;

    if (!address || !amount) {
      return;
    }

    const tokenAddress =
      direction === ExchangeDirection.buy
        ? paymentMethod.isCrypto
          ? paymentMethod.address
          : ''
        : cybroContractAddress.cybro;

    mutateAsync({
      amount,
      address,
      direction,
      tokenAddress,
      usdbOrWeth,
    })
      .then(() => {
        queryClient.invalidateQueries({ queryKey: [QueryKey.CybroBalance] });
        queryClient.invalidateQueries({
          queryKey: [QueryKey.BalanceErc20, tokenAddress, address],
        });

        const cybroAmount =
          direction === ExchangeDirection.buy ? receive : amount;

        triggerToast({
          message: `${formatNumber(cybroAmount)} CYBRO was ${direction === ExchangeDirection.buy ? 'purchased' : 'sold'}`,
          description: 'Check your updated balance',
        });

        form.form.setValue('amount', '');
        form.form.setValue('termsAndConditions', false);
        setReceive('');

        // const trackFunc =
        //   direction === ExchangeDirection.buy
        //     ? analytics.trackPurchaseCybro
        //     : analytics.trackSellCybro;
        //
        // trackFunc({ direction, cybroAmount });
      })
      .catch((error) => {
        // const trackFunc =
        //   direction === ExchangeDirection.buy
        //     ? analytics.trackPurchaseCybroError
        //     : analytics.trackSellCybroError;

        // const cybroAmount =
        //   direction === ExchangeDirection.buy ? receive : amount;

        // trackFunc({ direction, cybroAmount, message: JSON.stringify(error) });

        console.error(error);
        triggerToast({
          message: `Something went wrong`,
          description:
            'We were unable to complete the current operation. Try again or connect feedback.',
          type: ToastType.Error,
        });
      });
  });

  const modal = useDisclosure();

  /* Calculation */
  const [debouncedAmount] = useDebounceValue(form.amount, 500);

  useEffect(() => {
    mutateCalculationAsync({
      direction: form.direction,
      amount: debouncedAmount ?? '',
      usdbOrWeth,
    }).then(setReceive);
  }, [debouncedAmount]);

  return {
    ...form,
    tokenBalance,
    cybroBalance,
    cybroRate,
    isLoadingCybroRate,
    duration,
    receive,
    isSubmitDisabled,
    submitName,
    onSubmit,
    isLoadingCybroBalance,
    isLoadingTokenBalance,
    modal,
    maxAmount,
    isMaxAmountZero,
    isLessAmount,
    currentMaxAmount,
    isPending,
    isLoadingCalculate,
  };
};
