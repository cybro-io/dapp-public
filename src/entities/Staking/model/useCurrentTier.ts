import { useCallback, useMemo } from 'react';

import BigNumberJs from 'bignumber.js';
import { utils } from 'ethers';

import { stakeTiers, useGetTiers } from '@/entities/Staking';
import { MAX_TIER_INDEX } from '@/entities/Staking/libs/constants';
import { QueryKey, useAppKitAccount } from '@/shared/lib';
import { useGetSignatureApiV1StakingSignatureAddressGet } from '@/shared/types';

export const useCurrentTier = () => {
  const { address } = useAppKitAccount();
  const { tiersData, isLoading: isLoadingTiers } = useGetTiers();

  const { data: stakedData, isLoading: isLoadingStakedAmount } =
    useGetSignatureApiV1StakingSignatureAddressGet(address!, {
      query: {
        enabled: Boolean(address),
        queryKey: [QueryKey.StakedAmount, address],
      },
    });

  const stakedAmount = new BigNumberJs(
    stakedData?.data.data.staked_amount
      ? utils.formatEther(stakedData.data.data.staked_amount.toString())
      : 0,
  ).toNumber();

  const getTierByAmount = useCallback(
    (amount?: number) => {
      if (!amount || !tiersData) {
        return stakeTiers.everyone.index;
      }

      return tiersData.findIndex((tier, index, collection) => {
        const nextTier = collection[index + 1];

        if (nextTier === undefined && tier.shouldStake <= amount) {
          return true;
        }

        return (
          nextTier !== undefined &&
          tier.shouldStake <= amount &&
          amount < nextTier.shouldStake
        );
      });
    },
    [tiersData],
  );

  const currentTierIndex = useMemo(() => {
    return getTierByAmount(stakedAmount);
  }, [getTierByAmount, stakedAmount]);

  const nextTier = useMemo(() => {
    return tiersData?.find((tier) => tier.index === currentTierIndex + 1);
  }, [currentTierIndex, tiersData]);

  const currentTier = useMemo(() => {
    return tiersData?.find((tier) => tier.index === currentTierIndex);
  }, [currentTierIndex, tiersData]);

  const needStakeForNextTier = useMemo(() => {
    return nextTier && stakedAmount !== undefined
      ? new BigNumberJs(nextTier.shouldStake).minus(stakedAmount).toNumber()
      : 0;
  }, [nextTier, stakedAmount]);

  const haveReachedMaxTier = currentTierIndex >= MAX_TIER_INDEX;
  return {
    tiersData,
    stakedAmount,
    isLoading: isLoadingTiers || isLoadingStakedAmount,
    currentTier,
    currentTierIndex,
    needStakeForNextTier,
    nextTier,
    getTierByAmount,
    haveReachedMaxTier,
  };
};
