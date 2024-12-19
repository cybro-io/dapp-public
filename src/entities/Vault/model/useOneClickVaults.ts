import React from 'react';

import { QueryKey } from '@/shared/const';
import { useGetFundsApiV1VaultsGet, VaultResponseData } from '@/shared/types';

const vaultList = [40, 36, 42];

interface OneClickVault {
  vault: VaultResponseData;
  isDisabled?: boolean;
}

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
    const oneClickVaults: OneClickVault[] = [];

    vaultList.forEach((vaultId) => {
      const findVault = data?.data.data?.find((vault) => vaultId === vault.id);
      if (findVault) {
        oneClickVaults.push({ vault: findVault });
      } else {
        const vaultStart = data?.data.data?.at(0);
        oneClickVaults.push({ vault: vaultStart!, isDisabled: true });
      }
    });

    return oneClickVaults;
  }, [data]);

  const vaultSkeletons = Array.from({ length: 3 }).fill('');

  return { vaults, isLoading, vaultSkeletons };
};
