'use client';

import { createConfig, EVM, ChainId, config } from '@lifi/sdk';
import { providers } from 'ethers';

import { getChain } from '@/entities/LiFi';

const integrator = 'cybro';

export const evmProvider = EVM();
createConfig({
  integrator,
  providers: [evmProvider],
});

export const getProviderByChainId = (id: number) => {
  const rpcUrl = config.get().rpcUrls[id as ChainId];

  if (!rpcUrl) {
    return null;
  }
  return new providers.JsonRpcProvider(rpcUrl[0]);
};

export const getExplorerProvider = (chainId: number) => {
  const chain = getChain(chainId);

  return chain?.blockExplorers?.default.url ?? null;
};
