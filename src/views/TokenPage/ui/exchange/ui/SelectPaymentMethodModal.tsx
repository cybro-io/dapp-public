import React from 'react';

import { Modal, ModalContent } from '@heroui/modal';
import { ModalBody } from '@heroui/react';
import Image from 'next/image';

import { Typography } from '@/shared/ui';

import { exchangePaymentMethods } from '../constants/payment-method';
import { useExchangeContext } from '../model/ExchangeContext';

interface SelectPaymentMethodModalProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
}

export const SelectPaymentMethodModal = ({
  isOpen,
  onOpenChange,
}: SelectPaymentMethodModalProps) => {
  const { form } = useExchangeContext();

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      placement="center"
      radius="lg"
      classNames={{ base: 'bg-[#1A1B25]' }}
    >
      <ModalContent>
        {(onClose) => (
          <ModalBody className="flex flex-col justify-center items-center gap-[30px] pt-[39px] pb-[42px]">
            <Typography variant="unbounded" order={1}>
              Select payment method
            </Typography>

            <div className="flex flex-row gap-[14px]">
              {exchangePaymentMethods.map((paymentMethod) => (
                <button
                  onClick={() => {
                    form.setValue('paymentMethod', paymentMethod);
                    form.setValue('amount', '');
                    onOpenChange(false);
                  }}
                  key={paymentMethod.name}
                  className="transition hover:bg-opacity-70 flex gap-2 flex-col justify-center items-center w-[99px] h-[105px] rounded-[15px] bg-[#20222D] text-white/50"
                >
                  <Image
                    className="rounded-full"
                    src={paymentMethod.tokenIcon}
                    width={40}
                    height={40}
                    alt={paymentMethod.name}
                  />
                  <div>
                    <Typography variant="caption" order={1}>
                      {paymentMethod.name}
                    </Typography>
                    {paymentMethod.isCrypto && (
                      <Typography
                        variant="caption"
                        order={4}
                        className="!text-[10px]"
                      >
                        {paymentMethod.chain.name}
                      </Typography>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </ModalBody>
        )}
      </ModalContent>
    </Modal>
  );
};
