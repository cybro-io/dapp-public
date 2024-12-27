import * as yup from 'yup';

import { useForm } from '@/shared/lib';

interface StakeFormValues {
  amount: string;
}

const schema = yup.object().shape({
  amount: yup.number().required().positive(),
});

export const useStakeForm = (onSubmit: (values: StakeFormValues) => void) => {
  const form = useForm<StakeFormValues>({
    initialValues: {
      amount: '',
    },
    validationSchema: schema,
    onSubmit,
  });

  return form;
};
