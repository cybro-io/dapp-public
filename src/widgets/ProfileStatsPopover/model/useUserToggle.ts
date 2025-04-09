import React from 'react';

import { ChainId } from '@lifi/types';

import { useCybroBalance } from '@/entities/Staking';
import { useWeb3ModalAccount } from '@/shared/lib';
import {
  useGetProfileApiV1ProfileAddressGet,
  useGetProfileEarnedYieldApiV1ProfileAddressEarnedYieldGet,
} from '@/shared/types';

export const useUserToggle = () => {
  const { address } = useWeb3ModalAccount();

  const { data: userProfile, isLoading: isLoadingUserProfile } =
    useGetProfileApiV1ProfileAddressGet(address!, {
      query: {
        enabled: Boolean(address),
        select: (data) => data.data.data,
      },
    });

  const { data: earnedYield, isLoading: isLoadingEarnedYield } =
    useGetProfileEarnedYieldApiV1ProfileAddressEarnedYieldGet(address!, {
      query: {
        enabled: Boolean(address),
        select: (data) => data.data.data,
      },
    });

  const { balance, isLoadingBalance } = useCybroBalance({
    address,
    chainId: [ChainId.BLS, ChainId.BSC],
  });

  const cybroBalance = React.useMemo(() => {
    if (!balance) {
      return 0;
    }

    return balance.reduce((acc, cur) => acc + cur.cybro, 0);
  }, [balance]);

  const lcybroBalance = React.useMemo(() => {
    if (!balance) {
      return 0;
    }

    return balance.reduce((acc, cur) => acc + cur.locked, 0);
  }, [balance]);

  return {
    cybroBalance,
    lcybroBalance,
    balance,
    address,
    userProfile,
    earnedYield,
    isLoading: isLoadingEarnedYield || isLoadingUserProfile || isLoadingBalance,
  };
};
