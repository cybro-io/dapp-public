import React from 'react';

import { ConnectWallet } from '@/features/ConnectWallet';
import { Button, Text, TextView } from '@/shared/ui';

interface FundSubmitButtonProps extends React.PropsWithChildren {
  onClick?: () => void;
  isDisabled?: boolean;
}

export const FundSubmitButton = ({
  isDisabled,
  onClick,
  children,
}: FundSubmitButtonProps) => {
  return (
    <div className="p-1 bg-background-window rounded-2xl w-full">
      <ConnectWallet
        className="w-full"
        whenConnectedComponent={
          <Button className="w-full" onClick={onClick} disabled={isDisabled}>
            {children}
          </Button>
        }
      />
    </div>
  );
};
