import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import * as Sentry from '@sentry/nextjs';
import { useWeb3Modal } from '@web3modal/ethers5/react';

import { track, AnalyticsEvent } from '@/shared/analytics';
import { useToast } from '@/shared/lib';
import { useWeb3ModalAccount, useWeb3ModalDisconnect } from '@/shared/lib';
import { ToastType } from '@/shared/ui';
import { CustodialWalletAttentionModal } from '@/shared/ui/CustodialWalletAttentionModal';

type UseConnectWalletProps = {
  isForm?: boolean;
  onWalletConnect?: (address: string, chainId: number) => void;
};

export const useConnectWallet = ({
  isForm,
  onWalletConnect,
}: UseConnectWalletProps) => {
  const { triggerToast } = useToast();

  const { open } = useWeb3Modal();
  const { disconnect } = useWeb3ModalDisconnect();

  const { isConnected, address, chainId } = useWeb3ModalAccount();
  const [hasClickedConnect, setHasClickedConnect] = React.useState(false);
  const attentionModal = NiceModal.useModal(CustodialWalletAttentionModal);

  const handleConnect = React.useCallback(async () => {
    if (isForm) {
      track.event(AnalyticsEvent.VaultConnectWalletClickForm);
    } else {
      track.event(AnalyticsEvent.ConnectWalletClick);
    }

    setHasClickedConnect(true);
    attentionModal.show().then(() => open());
  }, [isForm, open]);

  React.useEffect(() => {
    if (
      hasClickedConnect &&
      isConnected &&
      address &&
      typeof chainId === 'number'
    ) {
      onWalletConnect?.(address, chainId);
      track.event(AnalyticsEvent.ConnectWalletSuccess);
      track.identify(address);
      setHasClickedConnect(false); // Reset the state after tracking
    }
  }, [isConnected, hasClickedConnect]);

  React.useEffect(() => {
    if (isConnected && !address) {
      triggerToast({
        message: `Something went wrong`,
        description:
          'We were unable to complete the current operation. Try again or connect support.',
        type: ToastType.Error,
      });

      Sentry.captureMessage('Wallet is connected, but no address found');
      disconnect();
    }
  }, [isConnected, address]);

  return { handleConnect, isConnected };
};