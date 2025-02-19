'use client';

import React from 'react';

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers5/react';
import { ChainId, GAS_TOKEN } from 'symbiosis-js-sdk';

import { $swapChains } from '@/entities/SwapToken';
import { Chain } from '@/shared/const';
import { $symbiosis } from '@/shared/lib';

type Web3ModalProps = {
  children: React.ReactNode;
};

const projectId = process.env
  .NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID as string;
const blastRpc = process.env.NEXT_PUBLIC_BLAST_RPC as string;
const type = process.env.NEXT_PUBLIC_TYPE as string;

const testChains = [
  {
    chainId: Chain.BlastTest,
    name: 'Blast Testnet',
    currency: 'ETH',
    explorerUrl: 'https://testnet.blastscan.io',
    rpcUrl: blastRpc,
  },
];

const mainChains = $swapChains.getState().map((chain) => {
  const chainConfig = $symbiosis.getState().chainConfig(chain.id);

  return {
    chainId: chain.id,
    name: chain.name,
    currency: GAS_TOKEN[chain.id].symbol ?? 'Unknown',
    explorerUrl: chain.explorer,
    rpcUrl: chain.id === ChainId.BLAST_MAINNET ? blastRpc : chainConfig.rpc,
  };
});

const metadata = {
  name: 'CYBRO',
  description:
    'CYBRO is an earn marketplace where users can choose investment tools based on desired returns and risk levels, including staking, farming, and lending',
  url: 'https://app.cybro.io',
  icons: ['https://avatars.mywebsite.com/'],
};

const chains = type === 'mainnet' ? mainChains : testChains;

const ethersConfig = defaultConfig({
  metadata,
  defaultChainId: ChainId.BLAST_MAINNET,
  auth: {
    email: false,
    socials: [],
  },
});

const featuredWalletIds = {
  metamask: 'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
  trustWallet:
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
  bitGetWallet:
    '38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662',
  okxWallet: '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
  foxWalletId:
    'c7708575a2c3c9e6a8ab493d56cdcc56748f03956051d021b8cd8d697d9a3fd2',
};

export const web3Modal = createWeb3Modal({
  ethersConfig,
  chains,
  projectId,
  enableAnalytics: true,
  enableOnramp: false,
  featuredWalletIds: Object.values(featuredWalletIds),
  enableSwaps: false,
});

export const Web3Modal: React.FC<Web3ModalProps> = ({ children }) => {
  return children;
};
