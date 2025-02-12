import React from 'react';

import { toast } from 'react-toastify';

import { Toast } from '@/shared/ui';
import { ToastType } from '@/shared/ui';

type ToastOptions = {
  message: string;
  description: string;
  type?: ToastType;
  actions?: React.ReactNode;
};

export const triggerToast = ({
  message,
  description,
  type,
  actions,
}: ToastOptions) => {
  toast(
    <Toast
      message={message}
      description={description}
      type={type}
      actions={actions}
    />,
  );
};

export const useToast = () => {
  return { triggerToast };
};
