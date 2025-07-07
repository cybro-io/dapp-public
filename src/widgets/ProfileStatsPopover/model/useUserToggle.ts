import React from 'react';

import { ChainId } from '@lifi/sdk';

import { useCybroBalance } from '@/entities/Staking';
import { useAppKitAccount } from '@/shared/lib';
import { useGetProfileApiV1ProfileAddressGet } from '@/shared/types';

export const useUserToggle = () => {
  const { address } = useAppKitAccount();

  const { data: userProfile, isLoading: isLoadingUserProfile } =
    useGetProfileApiV1ProfileAddressGet(address!, {
      query: {
        enabled: Boolean(address),
        select: (data) => data.data.data,
      },
    });

  const { balance: balances, isLoadingBalance } = useCybroBalance({
    address,
    chainId: [ChainId.BLS, ChainId.BSC],
  });

  const cybroBalance = React.useMemo(() => {
    if (!balances) {
      return 0;
    }

    return balances.reduce((acc, cur) => acc + cur.cybro, 0);
  }, [balances]);

  const lcybroBalance = React.useMemo(() => {
    if (!balances) {
      return 0;
    }

    return balances.reduce((acc, cur) => acc + cur.locked, 0);
  }, [balances]);

  return {
    cybroBalance,
    lcybroBalance,
    balances,
    address,
    userProfile,
    isLoading: isLoadingUserProfile || isLoadingBalance,
  };
};
