import React from 'react';

import clsx from 'clsx';

import { ConnectWallet } from '@/features/ConnectWallet';

import { useExchangeContext } from '../model/ExchangeContext';

export const ExchangeButton = () => {
  const { isSubmitDisabled, submitName } = useExchangeContext();
  return (
    <ConnectWallet
      className="w-full"
      whenConnectedComponent={
        <button
          disabled={isSubmitDisabled}
          type="submit"
          className={clsx(
            'button button--yellow !w-full !h-[53px] !text-sm',
            !submitName && 'button--arrow',
          )}
        >
          {submitName ?? 'Review transaction'}
        </button>
      }
    />
  );
};
