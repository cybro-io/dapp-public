import { useForm, useWatch } from 'react-hook-form';

import {
  exchangePaymentMethods,
  ExchangePaymentMethodType,
} from '../constants/payment-method';

import { ExchangeDirection } from './types';

interface FormValues {
  amount: string | undefined;
  direction: ExchangeDirection;
  paymentMethod: ExchangePaymentMethodType;
  termsAndConditions: boolean;
}

export const useExchangeForm = () => {
  const form = useForm<FormValues>({
    defaultValues: {
      amount: undefined,
      direction: ExchangeDirection.buy,
      paymentMethod: exchangePaymentMethods[0],
      termsAndConditions: false,
    },
  });

  const [paymentMethod, direction, amount, termsAndConditions] = useWatch({
    control: form.control,
    name: ['paymentMethod', 'direction', 'amount', 'termsAndConditions'],
  });

  const handleSwitchDirection = (newDirection: ExchangeDirection) => {
    form.setValue('direction', newDirection);
    form.setValue('amount', '');
  };

  return {
    form,
    paymentMethod,
    direction,
    amount,
    termsAndConditions,
    handleSwitchDirection,
  };
};
