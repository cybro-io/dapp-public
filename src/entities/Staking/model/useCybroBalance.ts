import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';
import { utils } from 'ethers';

import { getProviderByChainId } from '@/entities/LiFi';
import { QueryKey } from '@/shared/const';
import { createLockedTokenContract } from '@/shared/lib';
import { Maybe } from '@/shared/types';

import { useStakingConfig } from './useStakingConfig';

export const useCybroBalance = (address: Maybe<string>) => {
  const { config } = useStakingConfig();

  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.CybroBalance, address, config?.token.locked, config],
    enabled: Boolean(config),
    queryFn: async () => {
      console.log('getCybroBalance');
      if (!config || !address) {
        return defaultCybroBalance;
      }

      const provider = getProviderByChainId(ChainId.BLS);
      if (!provider) {
        return defaultCybroBalance;
      }

      const contract = createLockedTokenContract(config.token.locked, provider);

      const decimals = await contract.decimals();

      const locked = await contract.balanceOf(address);
      const unlocked = await contract.getUnlockedAmount(address);

      return {
        locked: new BigNumber(utils.formatUnits(locked, decimals) ?? 0)
          .dp(6, BigNumber.ROUND_DOWN)
          .toNumber(),

        unlocked: new BigNumber(utils.formatUnits(unlocked, decimals) ?? 0)
          .dp(6, BigNumber.ROUND_DOWN)
          .toNumber(),
      };
    },
  });

  return {
    balance: data ?? defaultCybroBalance,
    isLoadingBalance: isLoading,
  };
};

const defaultCybroBalance = {
  locked: 0,
  unlocked: 0,
};
