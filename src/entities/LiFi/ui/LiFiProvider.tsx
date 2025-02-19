'use client';

import React from 'react';

import EthereumProvider from '@walletconnect/ethereum-provider';
import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { Address, createWalletClient, custom, Chain, defineChain } from 'viem';
import {
  immutableZkEvm,
  gravity,
  taiko,
  fraxtal,
  rootstock,
  celo,
  mantle,
  arbitrum,
  blast,
  bsc,
  mainnet,
  optimism,
  polygon,
  base,
  avalanche,
  scroll,
  linea,
  zksync,
  polygonZkEvm,
  gnosis,
  fantom,
  moonriver,
  moonbeam,
  fuse,
  boba,
  mode,
  metis,
  aurora,
  sei,
  arbitrumNova,
  bahamut,
  coreDao,
  cronos,
  cronoszkEVM,
  kava,
  manta,
  zkLinkNova,
  zetachain,
  telos,
  merlin,
  bsquared,
} from 'viem/chains';

import { evmProvider } from '@/entities/LiFi';
import { useWeb3ModalAccount } from '@/shared/lib';

// boba bnb chain
export const bobaBnb = defineChain({
  id: 56288,
  name: 'Boba Bnb',
  nativeCurrency: {
    decimals: 18,
    name: 'BOBA',
    symbol: 'BOBA',
  },
  rpcUrls: {
    default: { http: ['https://bnb.boba.network'] },
  },
  blockExplorers: {
    default: {
      name: 'BOBAScan',
      url: 'https://bnb.bobascan.com',
    },
  },
  contracts: {},
});

const chains = [
  immutableZkEvm,
  gravity,
  taiko,
  fraxtal,
  rootstock,
  celo,
  mantle,
  arbitrum,
  arbitrumNova,
  blast,
  bsc,
  mainnet,
  optimism,
  polygon,
  base,
  avalanche,
  scroll,
  linea,
  zksync,
  polygonZkEvm,
  gnosis,
  fantom,
  moonriver,
  moonbeam,
  fuse,
  boba,
  bobaBnb,
  mode,
  metis,
  aurora,
  sei,
  bahamut,
  coreDao,
  cronos,
  cronoszkEVM,
  kava,
  manta,
  zkLinkNova,
  zetachain,
  telos,
  merlin,
  bsquared,
];

export const getChain = (chainId: number) =>
  chains.find((chain) => (chain as Chain).id === chainId) as Chain;

export const LiFiProvider = ({ children }: React.PropsWithChildren) => {
  const { walletProvider } = useWeb3ModalProvider();
  const { address, chainId } = useWeb3ModalAccount();

  React.useEffect(() => {
    if (!walletProvider || !address || typeof chainId !== 'number') return;

    const client = createWalletClient({
      account: address as Address,
      chain: getChain(chainId),
      transport: custom(walletProvider as EthereumProvider),
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
          transport: custom(walletProvider as EthereumProvider),
        });
      },
    });
  }, [walletProvider, address, chainId]);

  return <React.Fragment>{children}</React.Fragment>;
};
