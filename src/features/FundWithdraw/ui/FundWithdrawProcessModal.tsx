import React from 'react';

import NiceModal from '@ebay/nice-modal-react';

import { useFundWithdrawContext } from '@/features/FundWithdraw';
import { AssetWaitForComplete, WaitForCompleteModal } from '@/shared/ui';

export const WITHDRAW_PROCESS_MODAL_ID = 'WITHDRAW_PROCESS_MODAL_ID';

export const FundWithdrawProcessModal = () => {
  const { step, isLoadingWithdraw, selectedToken, receiveAmount } =
    useFundWithdrawContext();

  const currentModal = NiceModal.useModal(WITHDRAW_PROCESS_MODAL_ID);

  React.useEffect(() => {
    if (isLoadingWithdraw) {
      currentModal.show();
    } else {
      currentModal.hide();
    }
  }, [isLoadingWithdraw]);

  if (!isLoadingWithdraw || !selectedToken) return null;

  return (
    <WaitForCompleteModal
      asset1={
        <AssetWaitForComplete
          assetName={selectedToken.symbol}
          assetIconUrl={selectedToken.logoUrl}
          amount={receiveAmount}
          label="You receive"
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
      step={step}
      statuses={[`Sending transaction on ${selectedToken.chain.name}...`]}
      id={WITHDRAW_PROCESS_MODAL_ID}
    />
  );
};
