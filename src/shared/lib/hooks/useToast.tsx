import React from 'react';

import { toast } from 'react-toastify';

import { Toast } from '@/shared/ui';
import { ToastType } from '@/shared/ui';

type ToastOptions = {
  message: string;
  description: string;
  type?: ToastType;
  actions?: React.ReactNode;
  delay?: number;
};

export const triggerToast = ({
  message,
  description,
  type,
  actions,
  delay,
}: ToastOptions) => {
  toast(
    <Toast
      message={message}
      description={description}
      type={type}
      actions={actions}
    />,
    { delay },
  );
};

export const useToast = () => {
  return { triggerToast };
};
