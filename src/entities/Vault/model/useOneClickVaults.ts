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
    return data?.data.data?.filter(
      (vault) =>
        vault.parameter?.manager === 'cybro' &&
        vault.parameter?.management_type === 'auto',
    );
  }, [data]);

  const vaultSkeletons = Array.from({ length: 3 }).fill('');

  return { vaults, isLoading, vaultSkeletons };
};
