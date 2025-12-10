import NiceModal from '@ebay/nice-modal-react';

import {
  SwapSettingsModal,
  SwapSettingsModalProps,
} from '@/features/SwapSettings';

export const useSwapSettingsModal = () => {
  const openModal = (props: SwapSettingsModalProps) =>
    NiceModal.show(SwapSettingsModal, props);

  return { openModal };
};
