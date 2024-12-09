import React from 'react';

import { QueryKey } from '@/shared/const';
import { useGetFundsApiV1VaultsGet } from '@/shared/types';

export const useOneClickVaults = () => {
  const { data, isLoading } = useGetFundsApiV1VaultsGet(
    {},
    {
      query: {
        queryKey: [QueryKey.AvailableVaults],
      },
    },
  );

  const vaults = React.useMemo(() => {
    const oneClickVaults = data?.data.data?.filter(
      (vault) => vault.fund_type === 'one_click',
    );

    if (oneClickVaults && oneClickVaults.length < 3) {
      const vaultStart = data?.data.data?.at(0);
      const vaultEnd = data?.data.data?.at(1);

      oneClickVaults.unshift(vaultStart!);
      oneClickVaults.push(vaultEnd!);
    }

    return oneClickVaults;
  }, [data]);

  const vaultSkeletons = Array.from({ length: 3 }).fill('');

  return { vaults, isLoading, vaultSkeletons };
};
