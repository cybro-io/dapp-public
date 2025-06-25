import React from 'react';

import { ConnectWallet } from '@/features/ConnectWallet';
import { Button, Stack } from '@/shared/ui';

interface FundSubmitButtonProps extends React.PropsWithChildren {
  onClick?: () => void;
  isDisabled?: boolean;
  topSlot?: React.ReactNode;
}

export const FundSubmitButton = ({
  isDisabled,
  onClick,
  children,
  topSlot,
}: FundSubmitButtonProps) => {
  return (
    <Stack className="p-1 bg-background-window rounded-2xl w-full gap-1">
      {topSlot}
      <ConnectWallet
        className="w-full"
        whenConnectedComponent={
          <Button className="w-full" onClick={onClick} disabled={isDisabled}>
            {children}
          </Button>
        }
      />
    </Stack>
  );
};
