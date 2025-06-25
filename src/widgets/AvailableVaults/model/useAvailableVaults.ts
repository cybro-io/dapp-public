import React from 'react';

import { QueryKey } from '@/shared/lib';
import { useGetFundsApiV1VaultsGet } from '@/shared/types';

import { createTableColumns } from '../ui/tableColumns';

export const useAvailableVaults = () => {
  const {
    data,
    isLoading: isLoadingVaults,
    isError,
  } = useGetFundsApiV1VaultsGet(
    {},
    {
      query: {
        queryKey: [QueryKey.AvailableVaults],
      },
    },
  );

  const vaults = data?.data.data ?? [];

  const tableColumns = React.useMemo(
    () =>
      createTableColumns(
        vaults.map((vault) => vault.chain_name),
        vaults.map((vault) => vault.provider_name),
      ),
    [vaults],
  );

  return { isError, isLoadingVaults, vaults, tableColumns };
};
