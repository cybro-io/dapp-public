import React from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type FormValues = {
  email: string;
};

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required')
    .email('Enter a valid email address'),
});

export const useAddWaitListForm = (
  onSubmit: (formData: FormValues) => Promise<unknown>,
) => {
  const { handleSubmit: handleSubmitVendor, ...restForm } = useForm<FormValues>(
    {
      defaultValues: {
        email: '',
      },
      resolver: yupResolver(schema),
    },
  );

  const handleSubmit = handleSubmitVendor(onSubmit);

  React.useEffect(() => {
    restForm.reset();
  }, [restForm.formState.isSubmitted]);

  return { ...restForm, handleSubmit };
};
