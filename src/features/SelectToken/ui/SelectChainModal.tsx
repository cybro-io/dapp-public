import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import { SelectedChain } from '@/features/SelectToken/model/types';
import { Modal } from '@/shared/ui';

import { SelectChainsList } from './SelectChainsList';

export type SelectChainModalProps = {
  chains?: SelectedChain[];
  title?: string;
};

export const SelectChainModal = NiceModal.create<SelectChainModalProps>(
  ({ chains = [], title }) => {
    const currentModal = NiceModal.useModal();
    return (
      <Modal
        scrollBehavior="inside"
        onClose={() => currentModal.remove()}
        classNames={{ base: 'min-h-[500px]' }}
      >
        {title && <Modal.Header>{title}</Modal.Header>}
        <Modal.Body className="overflow-hidden h-full">
          <SelectChainsList
            onSelectChain={(chainId) => {
              currentModal.resolve(chainId);
              currentModal.remove();
            }}
            withHeader={false}
            defaultChains={chains}
          />
        </Modal.Body>
      </Modal>
    );
  },
);
