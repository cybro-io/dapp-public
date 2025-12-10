import { useMemo } from 'react';

import { getChainById } from '@lifi/data-types';
import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { utils } from 'ethers';
import { zeroAddress } from 'viem';

import { createTokenContract, getProviderByChainId } from '@/shared/lib';
import { Nullable } from '@/shared/types';

export interface UseGetErc20BalanceProps {
  walletAddress: Nullable<string>;
  chainId?: Nullable<ChainId>;
  tokenAddress: Nullable<string>;
}

export const useGetErc20Balance = ({
  walletAddress,
  chainId,
  tokenAddress,
}: UseGetErc20BalanceProps) => {
  const { data, isLoading, refetch } = useQuery({
    queryFn: async () => {
      if (!walletAddress || typeof tokenAddress !== 'string' || !chainId) {
        return null;
      }

      const provider = getProviderByChainId(chainId);
      const chain = getChainById(chainId);
      if (!provider || !chain) {
        throw new Error('Provider not found');
      }

      if (tokenAddress === '' || tokenAddress === zeroAddress) {
        const balance = await provider.getBalance(walletAddress);

        return utils.formatUnits(
          balance,
          chain.metamask.nativeCurrency.decimals,
        );
      }

      const tokenContract = createTokenContract(tokenAddress, provider);
      const balance = await tokenContract.balanceOf(walletAddress);
      const decimals = await tokenContract.decimals();

      return utils.formatUnits(balance, decimals);
    },
    enabled:
      Boolean(chainId) &&
      typeof tokenAddress === 'string' &&
      Boolean(walletAddress),
    queryKey: ['tokenBalance', walletAddress, chainId, tokenAddress],
    staleTime: 10_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
  });

  const balance = useMemo(() => data ?? '0', [data]);

  return { balance, isLoading, refetch };
};
