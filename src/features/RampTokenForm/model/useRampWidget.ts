import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import {
  MunzenEventType,
  MunzenOrder,
  useMunzenEvent,
} from '@/entities/Munzen';
import {
  getOrderDataApiV1MunzenOrderOrderIdGet,
  useGetPaymentLinkApiV1ProfileAddressPaymentLinkGet,
} from '@/shared/types';

export interface UseRampProps {
  toWallet: string;
  toCurrency: string;
  fromCurrency: string;
  fromAmount: number;
}

export const useRampWidget = ({
  toWallet,
  fromCurrency,
  toCurrency,
  fromAmount,
}: UseRampProps) => {
  const currentModal = NiceModal.useModal();

  const [isLoadingOrder, setIsLoadingOrder] = React.useState(false);

  const { data: rampLinkWidget, isLoading } =
    useGetPaymentLinkApiV1ProfileAddressPaymentLinkGet(
      toWallet,
      {
        from_currency: fromCurrency,
        to_currency: toCurrency,
        from_amount: fromAmount,
      },
      {
        query: {
          select: (data) => data.data.data.link,
          refetchOnWindowFocus: false,
          refetchInterval: false,
        },
      },
    );

  const handleSuccess = (orderId: string) => {
    setIsLoadingOrder(true);
    getOrderDataApiV1MunzenOrderOrderIdGet(orderId)
      .then((data) => {
        const orderData = data.data as unknown as MunzenOrder;
        currentModal.resolve(orderData);
        currentModal.remove();
      })
      .catch(() => {
        handleError();
      })
      .finally(() => {
        setIsLoadingOrder(false);
      });
  };

  const handleError = () => {
    currentModal.reject({ reason: 'Error widget munzen' });
    currentModal.remove();
  };

  useMunzenEvent((data) => {
    if (data.type === MunzenEventType.OnError) {
      handleError();
    } else if (
      data.type === MunzenEventType.OnOperationSuccess &&
      'orderId' in data.payload
    ) {
      handleSuccess(data.payload.orderId as string);
    }
  });

  return { isLoading: isLoading || isLoadingOrder, rampLinkWidget };
};
