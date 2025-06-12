import React from 'react';

import { ChainId } from '@lifi/sdk';

import { useErc20Balance } from '@/shared/lib';
import { Nullable } from '@/shared/types';

export interface UseGetErc20BalanceProps {
  address: Nullable<string>;
  chainId?: Nullable<ChainId>;
  tokenAddress: Nullable<string>;
}

export const useGetErc20Balance = ({
  address,
  chainId = ChainId.BLS,
  tokenAddress = '',
}: UseGetErc20BalanceProps) => {
  const { fetchBalance, balance, isLoading } = useErc20Balance();

  React.useEffect(() => {
    if (address && typeof chainId === 'number' && tokenAddress) {
      fetchBalance(address, chainId, tokenAddress ?? '');
    }
  }, [address, chainId, tokenAddress]);

  return { balance, isLoadingBalance: isLoading };
};
