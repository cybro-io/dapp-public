import { useMemo } from 'react';

import { ChainId, getTokenBalance } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { utils } from 'ethers';

import { useSwapTokens } from '@/entities/SwapToken';
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
  const { findToken } = useSwapTokens();

  const { data, ...query } = useQuery({
    queryFn: async () => {
      if (!walletAddress || !tokenAddress || !chainId) {
        return null;
      }

      const token = findToken(tokenAddress, chainId);

      if (!token) {
        return null;
      }

      const balanceResponse = await getTokenBalance(walletAddress, token);

      if (!balanceResponse || !balanceResponse.amount) {
        return null;
      }

      return utils.formatUnits(
        balanceResponse.amount,
        balanceResponse.decimals,
      );
    },
    enabled:
      Boolean(chainId) && Boolean(tokenAddress) && Boolean(walletAddress),
    queryKey: ['tokenBalance', walletAddress, chainId, tokenAddress],
    staleTime: 10_000,
    refetchInterval: 60_000,
    refetchOnWindowFocus: true,
  });

  const balance = useMemo(() => data ?? '0', [data]);

  return { balance, ...query };
};
