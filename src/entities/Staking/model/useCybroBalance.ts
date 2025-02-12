import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';
import { utils } from 'ethers';

import { getProviderByChainId } from '@/entities/LiFi';
import { QueryKey } from '@/shared/const';
import { createLockedTokenContract, createTokenContract } from '@/shared/lib';
import { Maybe } from '@/shared/types';

import { useStakingConfig } from './useStakingConfig';

export const useCybroBalance = (
  address: Maybe<string>,
  lockedAddress?: string,
) => {
  const { config } = useStakingConfig();

  const { data, isLoading } = useQuery({
    queryKey: [
      QueryKey.CybroBalance,
      address,
      config?.token.locked,
      config,
      lockedAddress,
    ],
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

      const cybroContract = createTokenContract(config.token.cybro, provider);
      const contract = createLockedTokenContract(
        lockedAddress ?? config.token.locked,
        provider,
      );

      const decimals = await contract.decimals();

      const locked = await contract.balanceOf(address);
      const cybro = await cybroContract.balanceOf(address);

      return {
        locked: new BigNumber(utils.formatUnits(locked, decimals) ?? 0)
          .dp(6, BigNumber.ROUND_DOWN)
          .toNumber(),

        cybro: new BigNumber(utils.formatUnits(cybro, decimals) ?? 0)
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
  cybro: 0,
};
