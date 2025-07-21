import * as yup from 'yup';

import { useForm } from '@/shared/lib';

export type SwapSettings = {
  slippage: number;
  deadline: number;
};

type UseSwapSettingsProps = SwapSettings & {
  onSubmit: (values: SwapSettings) => void;
};

const validationSchema = yup.object().shape({
  slippage: yup
    .number()
    .typeError('Invalid value')
    .required()
    .min(0.2)
    .max(100),
  deadline: yup.number().typeError('Invalid value').required().min(5).max(60),
});

export const useSwapSettingsForm = ({
  deadline,
  slippage,
  onSubmit,
}: UseSwapSettingsProps) => {
  const { setFieldValue, register, values, isValid, handleSubmit } = useForm({
    initialValues: {
      slippage,
      deadline,
    },
    validationSchema,
    onSubmit,
  });

  const isDisabledSubmit = !isValid;

  return { setFieldValue, register, isDisabledSubmit, values, handleSubmit };
};
