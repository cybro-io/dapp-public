import React from 'react';

import { useBridgeContext } from '@/features/BridgeForm';
import { ConnectWallet } from '@/features/ConnectWallet';
import { Button } from '@/shared/ui';

export const BridgeButton = () => {
  const { handleSubmit, isLoadingBridgeToken, submitText, isSubmitDisabled } =
    useBridgeContext();

  return (
    <ConnectWallet
      className="w-full"
      whenConnectedComponent={
        <Button
          isLoading={isLoadingBridgeToken}
          type="button"
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
          disabled={isSubmitDisabled}
          className="w-full"
        >
          {submitText || 'Bridge'}
        </Button>
      }
    />
  );
};
