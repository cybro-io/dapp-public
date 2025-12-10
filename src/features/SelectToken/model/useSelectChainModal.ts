import NiceModal from '@ebay/nice-modal-react';

import {
  SelectChainModalProps,
  SelectChainModal,
} from '@/features/SelectToken';

export type OpenSelectChainModal = SelectChainModalProps & {
  onSelectChain: (chainId: number) => void;
};

export const useSelectChainModal = () => {
  const modalSelectChain = NiceModal.useModal(SelectChainModal);

  const openModal = ({ onSelectChain, ...props }: OpenSelectChainModal) => {
    modalSelectChain
      .show(props)
      .then((chainId) => onSelectChain(chainId as number));
  };

  return { openModal };
};
