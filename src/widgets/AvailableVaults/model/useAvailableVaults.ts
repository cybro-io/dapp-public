import React from 'react';

import { QueryKey } from '@/shared/const';
import { useWeb3ModalAccount } from '@/shared/lib';
import { useGetFundsApiV1VaultsGet } from '@/shared/types';

import { createTableColumns } from '../ui/tableColumns';

export const useAvailableVaults = () => {
  const { address } = useWeb3ModalAccount();

  const {
    data,
    isLoading: isLoadingVaults,
    isError,
  } = useGetFundsApiV1VaultsGet(
    { address },
    {
      query: {
        queryKey: [QueryKey.AvailableVaults, address],
      },
    },
  );

  const vaults = data?.data.data ?? [];

  const tableColumns = React.useMemo(
    () =>
      createTableColumns(
        vaults.map((vault) => vault.chain),
        vaults.map((vault) => vault.provider.name),
      ),
    [vaults],
  );

  return { isError, isLoadingVaults, vaults, tableColumns };
};
