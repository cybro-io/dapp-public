'use client';

import React from 'react';

import clsx from 'clsx';

import { useAuthWallet } from '@/entities/Auth';
import { Button, ButtonProps } from '@/shared/ui';

import { useConnectWallet } from '../model/useConnectWallet';

type ConnectWalletProps = Omit<ButtonProps, 'children' | 'type' | 'onClick'> & {
  whenConnectedComponent?: React.ReactNode;
  isForm?: boolean;
  onWalletConnect?: (address: string, chainId: number) => void;
};

export const ConnectWallet = ({
  whenConnectedComponent,
  onWalletConnect,
  isForm = false,
  className,
  ...buttonProps
}: ConnectWalletProps) => {
  const { authWallet } = useAuthWallet();

  const { handleConnect, isConnected } = useConnectWallet({
    isForm,
    onWalletConnect: (address, chainId) => {
      authWallet(address);
      onWalletConnect?.(address, chainId);
    },
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
