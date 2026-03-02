import { useQuery } from '@tanstack/react-query';
import BigNumber from 'bignumber.js';
import { utils } from 'ethers';

import {
  STAKE_TIERS_FEE_PROVIDER,
  stakeTiersValuesMap,
} from '@/entities/Staking';
import { IStakeTier } from '@/entities/Staking/libs/constants';
import { createFeeProviderContract, getProviderByChainId } from '@/shared/lib';
import { FeeProvider } from '@/shared/types';

const getTierData = async (
  feeContract: FeeProvider,
  findIndex: number,
): Promise<IStakeTier> => {
  const findTier = stakeTiersValuesMap.find(({ index }) => index === findIndex);

  if (!findTier) {
    throw new Error('Tier not found.');
  }

  const tierData = await feeContract.tiersData(String(findIndex));

  return {
    ...findTier,
    feeDiscountPercent: new BigNumber(tierData[0]).div(100).toNumber(),
    shouldStake: new BigNumber(
      utils.formatUnits(tierData[1], STAKE_TIERS_FEE_PROVIDER.decimals),
    ).toNumber(),
  };
};

export const useGetTiers = () => {
  const { isLoading, data } = useQuery({
    queryKey: ['tiers'],
    queryFn: async () => {
      const provider = getProviderByChainId(STAKE_TIERS_FEE_PROVIDER.chainId);

      if (!provider) {
        throw new Error('No provider found.');
      }

      const contract = createFeeProviderContract(
        STAKE_TIERS_FEE_PROVIDER.address,
        provider,
      );

      const promises = stakeTiersValuesMap.map((tier) =>
        getTierData(contract, tier.index),
      );

      return Promise.all(promises);
    },
  });

  const tiersData = data;

  return { isLoading, tiersData };
};
