import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import { Button, Modal, TextView, Text } from '@/shared/ui';

export const RampAlertStepModal = NiceModal.create(() => {
  const currentModal = NiceModal.useModal();

  const onProceed = () => {
    currentModal.resolve();
    currentModal.remove();
  };

  return (
    <Modal
      isDismissable={false}
      classNames={{ base: 'w-[375px]' }}
      onClose={() => {
        currentModal.reject({ reason: 'on_close_munzen' });
        currentModal.remove();
      }}
    >
      <Modal.Header>Buy With a Card</Modal.Header>
      <Modal.Body className="pt-6 px-0 gap-4 relative">
        <div className="px-6 flex flex-col gap-2.5">
          <Text textView={TextView.H5} className="opacity-60 text-center">
            In a moment, the Munzen widget will open to handle your transaction
            securely and maintain the integrity of your smart contracts. Rest
            assured, your information is protected.
          </Text>

          <Text textView={TextView.H5} className="text-center">
            Once the widget appears, simply complete the form to finalize your
            transaction.
          </Text>
        </div>

        <img src={'/MunzenWidgetStep.png'} />

        <div className="px-6">
          <Button className="w-full" onClick={onProceed}>
            Proceed
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
});
