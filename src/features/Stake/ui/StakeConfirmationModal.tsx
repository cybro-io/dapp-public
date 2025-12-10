import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import { useStakeContext } from '@/features/Stake';
import { Button, ButtonView, Modal, Typography } from '@/shared/ui';

import { STAKE_CONFIRMATION_MODAL_ID } from '../constants';

import classNames from './Stake.module.scss';

interface StakeConfirmationModalProps {
  onAccept: () => void;
  onCancel: () => void;
}

const StakeConfirmation = NiceModal.create<StakeConfirmationModalProps>(
  ({ onAccept, onCancel }) => {
    return (
      <Modal classNames={{ base: 'w-[375px]' }} onClose={onCancel}>
        <Modal.Header>Staking Confirmation</Modal.Header>
        <Modal.Body className="gap-4 relative">
          <Typography
            variant="poppins"
            order={3}
            className="text-white/60 text-center !text-sm"
          >
            Once staked, your Locked CYBRO will remain locked until the staking
            period ends. Adding more Locked CYBRO later will reset the staking
            period.
            <span className="text-white"> Are you ready to proceed?</span>
          </Typography>

          <div className={classNames.confirmationBg}></div>

          <div className="flex flex-col gap-2">
            <Button view={ButtonView.Secondary} onClick={onCancel}>
              No, cancel
            </Button>
            <Button onClick={onAccept}>Yes, Confirm</Button>
          </div>
        </Modal.Body>
      </Modal>
    );
  },
);

export const StakeConfirmationModal = () => {
  const { isConfirmation, acceptConfirmation, cancelConfirmation } =
    useStakeContext();
  const currentModal = NiceModal.useModal(STAKE_CONFIRMATION_MODAL_ID);

  React.useEffect(() => {
    if (isConfirmation) {
      currentModal.show();
    } else {
      currentModal.remove();
    }
  }, [isConfirmation]);

  return (
    <StakeConfirmation
      id={STAKE_CONFIRMATION_MODAL_ID}
      onAccept={acceptConfirmation}
      onCancel={cancelConfirmation}
    />
  );
};
