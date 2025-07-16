import React from 'react';

import { ChainId } from '@lifi/sdk';
import * as yup from 'yup';

import { useForm } from '@/shared/lib';

interface StakeFormValues {
  amount: string;
  chainId: number;
}

const schema = yup.object().shape({
  amount: yup.number().required().positive(),
  chainId: yup.number().required(),
});

export const useStakeForm = (onSubmit: (values: StakeFormValues) => void) => {
  const form = useForm<StakeFormValues>({
    initialValues: {
      amount: '',
      chainId: ChainId.BLS,
    },
    validationSchema: schema,
    onSubmit,
  });

  React.useEffect(() => {
    form.setFieldValue('amount', '');
  }, [form.values.chainId]);

  return form;
};
