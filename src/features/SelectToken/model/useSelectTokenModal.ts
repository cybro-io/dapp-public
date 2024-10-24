import NiceModal from '@ebay/nice-modal-react';
import { Token } from 'symbiosis-js-sdk';

import { SelectTokenModal } from '@/features/SelectToken';

export type OpenSelectTokenModal = {
  selectedTokenId: string;
  nativeTokensId?: string[];
  onSelectToken: (token: Token) => void;
  onlyNativeTokens?: boolean;
};

export const useSelectTokenModal = () => {
  const modalSelectToken = NiceModal.useModal(SelectTokenModal);

  const openModal = ({
    selectedTokenId,
    nativeTokensId,
    onSelectToken,
    onlyNativeTokens,
  }: OpenSelectTokenModal) => {
    modalSelectToken
      .show({ selectedTokenId, nativeTokensId, onlyNativeTokens })
      .then((token) => onSelectToken(token as Token));
  };

  return { openModal };
};
