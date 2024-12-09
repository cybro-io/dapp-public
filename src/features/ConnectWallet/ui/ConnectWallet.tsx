'use client';

import React from 'react';

import clsx from 'clsx';

import { useAuthWallet } from '@/entities/Auth';
import { Button, ButtonProps } from '@/shared/ui';

import { useConnectWallet } from '../model/useConnectWallet';

type ConnectWalletProps = Omit<ButtonProps, 'children' | 'type' | 'onClick'> & {
  whenConnectedComponent?: React.ReactNode;
  isForm?: boolean;
};

export const ConnectWallet = ({
  whenConnectedComponent,
  isForm = false,
  className,
  ...buttonProps
}: ConnectWalletProps) => {
  const { authWallet } = useAuthWallet();

  const { handleConnect, isConnected } = useConnectWallet({
    isForm,
    onWalletConnect: authWallet,
  });

  if (isConnected) {
    return whenConnectedComponent;
  }

  return (
    <Button
      type="button"
      onClick={handleConnect}
      className={clsx(className)}
      {...buttonProps}
    >
      Connect Wallet
    </Button>
  );
};

export default ConnectWallet;
