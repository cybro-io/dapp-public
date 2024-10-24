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
import { SentSuccessModal, UnknownSwapModal } from '@/shared/ui';

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

  const currentModal = NiceModal.useModal();

  const showErrorModal = () => {
    currentModal.remove();
    NiceModal.show(UnknownSwapModal, {
      title: 'Exchange',
      primaryActionName: 'Try again',
      secondaryActionName: 'To home page',
    }).then();
  };

  const showSuccessModal = async (orderId: string) => {
    setIsLoadingOrder(true);
    getOrderDataApiV1MunzenOrderOrderIdGet(orderId)
      .then((data) => {
        const orderData = data.data as MunzenOrder;

        currentModal.remove();
        NiceModal.show(SentSuccessModal, {
          sentSymbol: orderData.fromCurrency,
          sentAmount: String(orderData.fromAmount),
          receivedSymbol: orderData.toCurrency,
          receivedAmount: String(orderData.toAmount),
          primaryActionName: 'To home page',
          title: 'Exchange',
        }).then();
      })
      .catch(() => showErrorModal())
      .finally(() => {
        setIsLoadingOrder(false);
      });
  };

  useMunzenEvent((data) => {
    if (data.type === MunzenEventType.OnError) {
      showErrorModal();
    } else if (
      data.type === MunzenEventType.OnOperationSuccess &&
      'orderId' in data.payload
    ) {
      showSuccessModal(data.payload.orderId as string);
    }
  });

  return { isLoading: isLoading || isLoadingOrder, rampLinkWidget };
};
