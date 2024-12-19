'use client';
import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import { Button, ButtonView, Modal } from '@/shared/ui';

interface UnknownSwapModalProps {
  title?: string;
  onSecondaryAction?: () => void;
  onPrimaryAction?: () => void;
  secondaryActionName?: string;
  primaryActionName?: string;
}

export const UnknownSwapModal = NiceModal.create<UnknownSwapModalProps>(
  ({
    title,
    onSecondaryAction,
    onPrimaryAction,
    secondaryActionName,
    primaryActionName,
  }) => {
    const currentModal = NiceModal.useModal();

    const handleSecondaryAction = () => {
      onSecondaryAction?.();
      currentModal.remove();
    };

    const handlePrimaryAction = () => {
      onPrimaryAction?.();
      currentModal.remove();
    };

    return (
      <Modal
        classNames={{ base: 'w-[375px]' }}
        onClose={() => currentModal.remove()}
      >
        <Modal.Header>{title || 'Error'}</Modal.Header>
        <div
          className={
            'bg-[url("/SwapUnknownError.png")] bg-center bg-contain w-full h-[295px] top-[64px]'
          }
        />
        <Modal.Body className="pt-4 gap-4 relative">
          <div className="flex flex-col gap-2">
            {secondaryActionName && (
              <Button
                view={ButtonView.Secondary}
                onClick={handleSecondaryAction}
              >
                {secondaryActionName}
              </Button>
            )}
            {primaryActionName && (
              <Button onClick={handlePrimaryAction}>{primaryActionName}</Button>
            )}
          </div>
        </Modal.Body>
      </Modal>
    );
  },
);
