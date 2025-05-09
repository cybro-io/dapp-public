import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import { useBridgeContext } from '@/features/BridgeForm';
import { AssetWaitForComplete, WaitForCompleteModal } from '@/shared/ui';
// @ts-ignore
import cybroUrl from '@assets/assets/cybro.svg?url';

export const BRIDGE_PROCESS_MODAL_ID = 'BRIDGE_PROCESS_MODAL_ID';

export const BridgeProcessModal = () => {
  const { isLoadingBridgeToken, step, sourceChain, destinationChain, form } =
    useBridgeContext();

  const amount = form.values.amount;

  const statuses = React.useMemo(() => {
    const array = [
      `Approving transaction on ${sourceChain?.name}...`,
      `Sending transaction on ${sourceChain?.name}...`,
      'Wait for cross-chain tx finalization by LayerZero',
    ];

    return array;
  }, [sourceChain]);

  const currentModal = NiceModal.useModal(BRIDGE_PROCESS_MODAL_ID);

  React.useEffect(() => {
    if (isLoadingBridgeToken) {
      currentModal.show();
    } else {
      currentModal.hide();
    }
  }, [isLoadingBridgeToken]);

  if (!isLoadingBridgeToken) {
    return null;
  }

  return (
    <WaitForCompleteModal
      asset1={
        <AssetWaitForComplete
          assetName="CYBRO"
          assetIconUrl={cybroUrl}
          amount={amount}
          label="You deposit"
          chain={{
            chainName: sourceChain?.name ?? '',
            chainIconUrl: sourceChain?.logoUrl ?? '',
          }}
        />
      }
      asset2={
        <AssetWaitForComplete
          assetName="CYBRO"
          assetIconUrl={cybroUrl}
          amount={amount}
          label="You receive"
          chain={{
            chainName: destinationChain?.name ?? '',
            chainIconUrl: destinationChain?.logoUrl ?? '',
          }}
        />
      }
      step={step}
      statuses={statuses}
      id={BRIDGE_PROCESS_MODAL_ID}
    />
  );
};
