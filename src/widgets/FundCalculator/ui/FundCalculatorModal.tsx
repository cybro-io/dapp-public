import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import { FundDeposit } from '@/features/FundDeposit';
import { FundWithdraw } from '@/features/FundWithdraw';
import { SingleVaultResponseData } from '@/shared/types';
import { Modal } from '@/shared/ui';
import { FundCalculatorContextProvider } from '@/widgets/FundCalculator';

interface FundCalculatorModalProps {
  vault: SingleVaultResponseData;
  type: 'deposit' | 'withdraw';
}

export const FundCalculatorModal = NiceModal.create<FundCalculatorModalProps>(
  ({ vault, type }) => {
    const currentModal = NiceModal.useModal();
    return (
      <FundCalculatorContextProvider vault={vault}>
        <Modal
          onClose={() => {
            currentModal.remove();
          }}
        >
          <Modal.Header>
            {type === 'deposit' ? 'Deposit' : 'Withdraw'}
          </Modal.Header>
          <Modal.Body>
            {type === 'deposit' ? <FundDeposit /> : <FundWithdraw />}
          </Modal.Body>
        </Modal>
      </FundCalculatorContextProvider>
    );
  },
);
