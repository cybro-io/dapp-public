'use client';

import React from 'react';

import { useAppKitNetwork } from '@reown/appkit/react';
import { Address, createWalletClient, custom } from 'viem';

import { appKit } from '@/app/providers';
import { evmProvider } from '@/entities/LiFi';
import { getChain, useAppKitAccount } from '@/shared/lib';

export const LiFiProvider = ({ children }: React.PropsWithChildren) => {
  const { address } = useAppKitAccount();
  const { chainId } = useAppKitNetwork();

  React.useEffect(() => {
    const walletProvider = appKit.getWalletProvider();

    if (!walletProvider || !address || typeof chainId !== 'number') return;

    const client = createWalletClient({
      account: address as Address,
      chain: getChain(chainId),
      transport: custom(walletProvider as Parameters<typeof custom>[0]),
    });

    evmProvider.setOptions({
      getWalletClient: async () => client,
      switchChain: async (switchChainId) => {
        const chain = getChain(switchChainId);
        if (chain) {
          await client
            .switchChain(chain)
            .catch(() => client.addChain({ chain }));
        }

        return createWalletClient({
          account: address as Address,
          chain,
          transport: custom(walletProvider as Parameters<typeof custom>[0]),
        });
      },
    });
  }, [address, chainId]);

  return <React.Fragment>{children}</React.Fragment>;
};
