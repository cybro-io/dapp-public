import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import { useFundDepositContext } from '@/features/FundDeposit';
import { AssetWaitForComplete, WaitForCompleteModal } from '@/shared/ui';

export const DEPOSIT_PROCESS_MODAL_ID = 'DEPOSIT_PROCESS_MODAL_ID';

export const FundDepositProcessModal = () => {
  const {
    isProcessing,
    selectedToken,
    defaultToken,
    isSelectedDefaultToken,
    receivedAmount,
    amountNumber,
    step,
    statuses,
  } = useFundDepositContext();

  const currentModal = NiceModal.useModal(DEPOSIT_PROCESS_MODAL_ID);

  React.useEffect(() => {
    if (isProcessing) {
      currentModal.show();
    } else {
      currentModal.hide();
    }
  }, [isProcessing]);

  if (!isProcessing || !selectedToken) {
    return null;
  }

  return (
    <WaitForCompleteModal
      asset1={
        <AssetWaitForComplete
          assetName={selectedToken.symbol}
          assetIconUrl={selectedToken.logoUrl}
          amount={amountNumber}
          label="You deposit"
          chain={
            selectedToken.isCrypto
              ? {
                  chainName: selectedToken.chain.name,
                  chainIconUrl: selectedToken.chain.logoUrl,
                }
              : undefined
          }
        />
      }
      asset2={
        isSelectedDefaultToken ? null : (
          <AssetWaitForComplete
            assetName={defaultToken.symbol}
            assetIconUrl={defaultToken.logoUrl}
            amount={receivedAmount}
            label="You receive"
            chain={{
              chainName: defaultToken.chain.name,
              chainIconUrl: defaultToken.chain.logoUrl,
            }}
          />
        )
      }
      step={step}
      statuses={statuses}
      id={DEPOSIT_PROCESS_MODAL_ID}
    />
  );
};
