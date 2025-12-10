import React from 'react';

import { useDebounceValue } from 'usehooks-ts';
import * as yup from 'yup';

import { MunzenRate } from '@/entities/Munzen';
import { MunzenCurrency } from '@/entities/Munzen/model/types';
import { useForm } from '@/shared/lib';

export interface RampFormValues {
  fromCurrency: MunzenCurrency | null;
  toCurrency: MunzenCurrency | null;
  amountIn: string;
  amountOut: string;
  priceInUsd: number;
  priceOutUsd: number;
}

const validationSchema = (rates: MunzenRate[]) =>
  yup.object().shape({
    amountIn: yup
      .number()
      .typeError('Invalid value')
      .required('Amount is required')
      .positive('Amount is positive ')
      .test('min', function (value, context) {
        const fromCurrency = context.parent.fromCurrency;
        const toCurrency = context.parent.toCurrency;

        const rate = rates.find(
          (rate) =>
            rate.fromCurrency === fromCurrency?.tickerWithNetwork &&
            rate.toCurrency === toCurrency?.tickerWithNetwork,
        );

        if (rate && value < rate.minAmount) {
          return this.createError({
            path: 'amountIn',
            message: 'Amount is too low',
          });
        }

        return true;
      })
      .test('max', function (value, context) {
        const fromCurrency = context.parent.fromCurrency;
        const toCurrency = context.parent.toCurrency;

        const rate = rates.find(
          (rate) =>
            rate.fromCurrency === fromCurrency?.tickerWithNetwork &&
            rate.toCurrency === toCurrency?.tickerWithNetwork,
        );

        if (rate && value > rate.maxAmount) {
          return this.createError({
            path: 'amountIn',
            message: 'Amount is too high',
          });
        }

        return true;
      }),
  });

interface OnChangeAmountData {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
}

interface UseRampFormProps {
  onSubmit: (data: RampFormValues) => Promise<void> | void;
  onChangeAmountIn: (data: OnChangeAmountData) => void;
  rates: MunzenRate[];
  initialCurrencies: {
    to: RampFormValues['toCurrency'];
    from: RampFormValues['fromCurrency'];
  };
}

export const useRampForm = ({
  onChangeAmountIn,
  onSubmit,
  rates,
  initialCurrencies,
}: UseRampFormProps) => {
  const form = useForm<RampFormValues>({
    initialValues: {
      amountIn: '',
      amountOut: '',
      fromCurrency: initialCurrencies.from, //currencies.find(c => c.tickerWithNetwork === 'USD') || currencies[0],
      toCurrency: initialCurrencies.to, //currencies.find(c => c.tickerWithNetwork === 'USDT-TRC20') || currencies[1],
      priceInUsd: 0,
      priceOutUsd: 0,
    },
    validateOnMount: true,
    validationSchema: validationSchema(rates),
    onSubmit: async (data, state) => {
      try {
        await onSubmit(data);
      } finally {
        state.setTouched({});
      }
    },
  });

  const [debouncedAmountIn] = useDebounceValue(form.values.amountIn, 500);

  React.useEffect(() => {
    if (
      form.values.fromCurrency &&
      form.values.toCurrency &&
      Number(debouncedAmountIn) > 0
    ) {
      onChangeAmountIn?.({
        fromCurrency: form.values.fromCurrency.tickerWithNetwork,
        toCurrency: form.values.toCurrency.tickerWithNetwork,
        amount: debouncedAmountIn,
      });
    }
  }, [debouncedAmountIn, form.values.fromCurrency, form.values.toCurrency]);

  const handleChangeCurrency = (
    currency: MunzenCurrency,
    side: 'from' | 'to',
  ) => {
    form.setFieldValue(side + 'Currency', currency);

    form.setFieldValue('amountIn', '');
    form.setFieldValue('amountOut', '');
  };

  return { ...form, handleChangeCurrency };
};
