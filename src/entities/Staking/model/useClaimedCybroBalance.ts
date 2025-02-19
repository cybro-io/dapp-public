import { ChainId } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';
import { utils } from 'ethers';

import { getProviderByChainId } from '@/entities/LiFi';
import { QueryKey } from '@/shared/const';
import { createLockedTokenContract } from '@/shared/lib';
import { Maybe } from '@/shared/types';

import { useStakingConfig } from './useStakingConfig';

export const useClaimedCybroBalance = (
  address: Maybe<string>,
  lockedAddress?: string,
) => {
  const { data, isLoading } = useQuery({
    queryKey: [QueryKey.ClaimedCybroBalance, address, lockedAddress],
    enabled: Boolean(lockedAddress) && Boolean(address),
    queryFn: async () => {
      console.log('getClaimedCybroBalance');
      if (!lockedAddress || !address) {
        return defaultClaimed;
      }

      const provider = getProviderByChainId(ChainId.BLS);
      if (!provider) {
        return defaultClaimed;
      }

      const contract = createLockedTokenContract(lockedAddress, provider);
      const balance = await contract.claimedAmount(address);
      const claimable = await contract.getClaimableAmount(address);

      return {
        claimed: new BigNumber(utils.formatUnits(balance) ?? 0)
          .dp(6, BigNumber.ROUND_DOWN)
          .toNumber(),
        claimable: new BigNumber(utils.formatUnits(claimable) ?? 0)
          .dp(6, BigNumber.ROUND_DOWN)
          .toNumber(),
      };
    },
  });

  return {
    claim: data ?? defaultClaimed,
    isLoadingClaimedBalance: isLoading,
  };
};

const defaultClaimed = {
  claimed: 0,
  claimable: 0,
};
