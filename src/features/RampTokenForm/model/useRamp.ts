import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import {
  MunzenOrder,
  useMunzenCurrencies,
  useMunzenCurrenciesFee,
  useMunzenRates,
} from '@/entities/Munzen';
import {
  useRampCalculate,
  useRampForm,
  useRampProcessing,
} from '@/features/RampTokenForm';
import { AnalyticsEvent, track } from '@/shared/analytics';
import { useAppKitAccount } from '@/shared/lib';
import { SentSuccessModal, UnknownSwapModal } from '@/shared/ui';

export const useRamp = () => {
  const { address, isConnected } = useAppKitAccount();
  const { ramp } = useRampProcessing();

  const { handleCalculate, ...calculateRest } = useRampCalculate();

  const { rates } = useMunzenRates();
  const { currencies } = useMunzenCurrencies();

  const initialCurrencies = React.useMemo(
    () => ({
      from:
        currencies?.find((currency) => currency.tickerWithNetwork === 'USD') ??
        null,
      to:
        currencies?.find(
          (currency) => currency.tickerWithNetwork === 'ETH-BLAST',
        ) ?? null,
    }),
    [currencies],
  );

  const showErrorModal = () => {
    NiceModal.show(UnknownSwapModal, {
      title: 'Exchange',
      primaryActionName: 'Try again',
      secondaryActionName: 'To home page',
    }).then();
  };

  const showSuccessModal = (orderData: MunzenOrder) => {
    NiceModal.show(SentSuccessModal, {
      sentSymbol: orderData.fromCurrency,
      sentAmount: String(orderData.fromAmount),
      receivedSymbol: orderData.toCurrency,
      receivedAmount: String(orderData.toAmount),
      primaryActionName: 'To home page',
      title: 'Exchange',
    }).then();
  };

  const form = useRampForm({
    onSubmit: (data) => {
      if (!address) return;

      track.event(AnalyticsEvent.ExchangeBuyCrypto);

      ramp({
        toCurrency: data.toCurrency!.tickerWithNetwork,
        fromCurrency: data.fromCurrency!.tickerWithNetwork,
        fromAmount: Number(data.amountIn!),
        toWallet: address,
      })
        .then(showSuccessModal)
        .catch(showErrorModal);
    },
    onChangeAmountIn: (data) => {
      form.setFieldValue('amountOut', handleCalculate({ ...data, fee }).amount);
    },
    rates: rates ?? [],
    initialCurrencies,
  });

  const { fee, isLoading } = useMunzenCurrenciesFee(
    `${form.values.fromCurrency?.tickerWithNetwork}_${form.values.toCurrency?.tickerWithNetwork}`,
  );

  const isDisabledAmount =
    !form.values.toCurrency || !form.values.fromCurrency || isLoading;

  const isDisabledSubmit =
    form.isSubmitting ||
    !form.isValid ||
    !form.values.toCurrency ||
    !form.values.fromCurrency ||
    isLoading;

  return {
    isConnected,
    ...calculateRest,
    isDisabledAmount,
    isDisabledSubmit,
    form,
  };
};
