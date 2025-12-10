import React from 'react';

import { ConnectWallet } from '@/features/ConnectWallet';
import { useStakeContext } from '@/features/Stake';
import { Button } from '@/shared/ui';

export const StakeButton = () => {
  const {
    period,
    submitText,
    isSubmitDisabled,
    isPendingStakeToken,
    handleSubmit,
  } = useStakeContext();

  return (
    <ConnectWallet
      whenConnectedComponent={
        <Button
          isLoading={isPendingStakeToken}
          type="button"
          onClick={(event) => {
            event.preventDefault();
            handleSubmit();
          }}
          disabled={isSubmitDisabled}
        >
          {submitText || `Stake for ${period?.months} months`}
        </Button>
      }
    />
  );
};
