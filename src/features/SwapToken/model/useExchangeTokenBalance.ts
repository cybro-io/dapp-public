import React, { useState } from 'react';

import { Token } from 'symbiosis-js-sdk';

import { useSwap } from '@/features/SwapToken';
import { useAppKitAccount } from '@/shared/lib';
import { useGetTokenBalance, useSymbiosis } from '@/shared/lib';

export const useExchangeTokenBalance = (token: Token | null) => {
  const { subscribeSuccessSwap } = useSwap();
  const { address } = useAppKitAccount();
  const symbiosis = useSymbiosis();
  const { isLoading, fetchBalance } = useGetTokenBalance();

  const [balance, setBalance] = useState('0');

  const getTokenBalance = (token: Token, address: string) => {
    if (!address) return;

    const provider = symbiosis.providers.get(token.chainId);
    if (provider) {
      fetchBalance(token, provider, address).then(setBalance).catch(setBalance);
    }
  };

  React.useEffect(() => {
    if (!token || !address) return;

    getTokenBalance(token, address);

    const subscriber = subscribeSuccessSwap(() => {
      getTokenBalance(token, address);
    });

    return () => {
      subscriber.unsubscribe();
    };
  }, [token, address]);

  return { balance, isLoading };
};
