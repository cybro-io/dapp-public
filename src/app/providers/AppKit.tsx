'use client';

import React from 'react';

import { createAppKit, Metadata } from '@reown/appkit/react';
import { Ethers5Adapter } from '@reown/appkit-adapter-ethers5';
import { blast, blastSepolia } from 'viem/chains';

import { chains, testChains } from '@/shared/lib/constants/chains';

const projectId = process.env
  .NEXT_PUBLIC_WALLET_CONNECT_CLOUD_PROJECT_ID as string;

const type = process.env.NEXT_PUBLIC_TYPE as string;

const metadata: Metadata = {
  name: 'CYBRO',
  description:
    'CYBRO is an earn marketplace where users can choose investment tools based on desired returns and risk levels, including staking, farming, and lending',
  url: 'https://app.cybro.io',
  icons: ['https://avatars.mywebsite.com/'],
};

const networks = type === 'mainnet' ? chains : testChains;
const defaultNetwork = type === 'mainnet' ? blast : blastSepolia;

const featuredWalletIds = {
  binance: '8a0ee50d1f22f6651afcae7eb4253e52a3310b90af5daef78a8c4929a9bb99d4',
  metamask: 'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
  trustWallet:
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0',
  bitGetWallet:
    '38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662',
  okxWallet: '971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709',
  foxWalletId:
    'c7708575a2c3c9e6a8ab493d56cdcc56748f03956051d021b8cd8d697d9a3fd2',
};

export const appKit = createAppKit({
  adapters: [new Ethers5Adapter()],
  metadata,
  networks: [defaultNetwork, ...networks],
  projectId,
  defaultNetwork,
  featuredWalletIds: Object.values(featuredWalletIds),
  features: {
    onramp: false,
    email: false,
    socials: [],
    analytics: true,
  },
});

export const AppKit = ({ children }: React.PropsWithChildren) => {
  return children;
};
