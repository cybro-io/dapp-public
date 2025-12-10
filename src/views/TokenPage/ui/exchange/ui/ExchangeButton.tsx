import React from 'react';

import { ConnectWallet } from '@/features/ConnectWallet';
import { Button } from '@/shared/ui';

import { useExchangeContext } from '../model/ExchangeContext';

export const ExchangeButton = () => {
  const { isSubmitDisabled, submitName } = useExchangeContext();
  return (
    <ConnectWallet
      className="w-full"
      whenConnectedComponent={
        <Button type="submit" disabled={isSubmitDisabled} className="w-full">
          {submitName ?? 'Review transaction'}
        </Button>
      }
    />
  );
};
