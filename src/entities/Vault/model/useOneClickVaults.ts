import React from 'react';

import { QueryKey } from '@/shared/lib';
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
    return data?.data.data?.sort((a, b) => a.rating - b.rating);
  }, [data]);

  const vaultSkeletons = Array.from({ length: 3 }).fill('');

  return { vaults, isLoading, vaultSkeletons };
};
