import React from 'react';

import { getErc20Balance } from '@/shared/lib';

export const useErc20Balance = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [balance, setBalance] = React.useState('0');

  const fetchBalance = (
    walletAddress: string,
    chainId: number,
    tokenAddress = '',
  ) => {
    setIsLoading(true);
    getErc20Balance(walletAddress, tokenAddress, chainId)
      .then(setBalance)
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { fetchBalance, balance, isLoading };
};
