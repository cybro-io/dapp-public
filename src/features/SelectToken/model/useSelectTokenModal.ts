import NiceModal from '@ebay/nice-modal-react';

import { SelectedToken } from '@/entities/fund';
import { SelectTokenModal } from '@/features/SelectToken';

export type OpenSelectTokenModal = {
  selectedTokenId: string;
  nativeTokensId?: string[];
  onSelectToken: (token: SelectedToken) => void;
  onlyNativeTokens?: boolean;
  disabledSelectChain?: boolean;
  withFiat?: boolean;
};

export const useSelectTokenModal = () => {
  const modalSelectToken = NiceModal.useModal(SelectTokenModal);

  const openModal = ({ onSelectToken, ...props }: OpenSelectTokenModal) => {
    modalSelectToken
      .show(props)
      .then((token) => onSelectToken(token as SelectedToken));
  };

  return { openModal };
};
