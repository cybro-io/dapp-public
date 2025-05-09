import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { utils } from 'ethers';

import { getProviderByChainId } from '@/shared/lib';
import { QueryKey } from '@/shared/lib';
import { createTokenContract } from '@/shared/lib';

interface UseBalanceErc20QueryProps {
  token?: string;
  address?: string;
  chainId: ChainId;
}

export const useBalanceErc20Query = ({
  token,
  address,
  chainId,
}: UseBalanceErc20QueryProps) => {
  return useQuery({
    queryFn: async () => {
      if (!address) {
        return '0' as string;
      }

      const provider = getProviderByChainId(chainId);

      if (!provider) {
        return '0' as string;
      }

      if (!token) {
        const balance = await provider.getBalance(address);
        return utils.formatUnits(balance);
      }

      const tokenContract = createTokenContract(token, provider);
      const balance = await tokenContract.balanceOf(address);

      return utils.formatUnits(balance);
    },
    enabled: Boolean(address),
    refetchInterval: 60000,
    queryKey: [QueryKey.BalanceErc20, address, token, chainId],
  });
};
