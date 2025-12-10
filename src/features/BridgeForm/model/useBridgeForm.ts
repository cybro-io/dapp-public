import { ChainId } from '@lifi/sdk';
import { utils } from 'ethers';
import * as yup from 'yup';

import { useForm } from '@/shared/lib';

export interface BridgeFormValues {
  amount: string;
  address: string;
  destinationChain: number;
  sourceChain: number;
}

const schema = yup.object().shape({
  amount: yup.number().required().positive().typeError('Invalid value'),
  address: yup
    .string()
    .notRequired()
    .test((value, context) => {
      return value && !utils.isAddress(value)
        ? context.createError({
            message: 'Invalid address',
            path: 'address',
          })
        : true;
    }),
  destinationChain: yup.number().positive().typeError('Invalid value'),
  sourceChain: yup.number().positive().typeError('Invalid value'),
});

export const useBridgeForm = (onSubmit: (values: BridgeFormValues) => void) => {
  const form = useForm<BridgeFormValues>({
    initialValues: {
      amount: '',
      address: '',
      sourceChain: ChainId.BLS,
      destinationChain: ChainId.BSC,
    },
    validationSchema: schema,
    onSubmit,
  });

  return form;
};
