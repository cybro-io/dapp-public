import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import {
  useMunzenCurrencies,
  useMunzenCurrenciesFee,
  useMunzenRates,
} from '@/entities/Munzen';
import {
  RampAlertStepModal,
  RampWidgetStepModal,
  useRampCalculate,
  useRampForm,
} from '@/features/RampTokenForm';
import { useWeb3ModalAccount } from '@/shared/lib';

export const useRamp = () => {
  const { address, isConnected } = useWeb3ModalAccount();

  const { handleCalculate, ...calculateRest } = useRampCalculate();

  const { rates } = useMunzenRates();
  const { currencies } = useMunzenCurrencies();

  const rampAlertModal = NiceModal.useModal(RampAlertStepModal);
  const rampWidgetModal = NiceModal.useModal(RampWidgetStepModal);

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

  const form = useRampForm({
    onSubmit: (data) => {
      rampAlertModal
        .show()
        .then(() =>
          rampWidgetModal.show({
            toCurrency: data.toCurrency!.tickerWithNetwork,
            fromCurrency: data.fromCurrency!.tickerWithNetwork,
            fromAmount: Number(data.amountIn!),
            toWallet: address,
          }),
        )
        .catch(() => rampAlertModal.remove());
    },
    onChangeAmountIn: (data) => {
      form.setFieldValue('amountOut', handleCalculate({ ...data, fee }));
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
