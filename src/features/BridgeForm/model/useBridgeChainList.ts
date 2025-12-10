import React from 'react';

import { useStakingConfig } from '@/entities/Staking';

import { chainFormatBridgeSelectedChain } from '../lib/utils';

export const useBridgeChainList = () => {
  const { config } = useStakingConfig();

  const bridgeChains = React.useMemo(() => {
    const tokenData = config?.token;

    if (!tokenData) {
      return null;
    }

    return Object.entries(tokenData).map(chainFormatBridgeSelectedChain);
  }, [config?.token]);

  return { bridgeChains };
};
