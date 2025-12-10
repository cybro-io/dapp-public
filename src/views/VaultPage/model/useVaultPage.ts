import React from 'react';

import { notFound } from 'next/navigation';
import numeral from 'numeral';

import { useSeasonVaultChart } from '@/entities/Vault';
import { isSeasonalVault, QueryKey } from '@/shared/lib';
import {
  useGetFundApiV1VaultsVaultIdGet,
  useGetFundFeesApiV1VaultsVaultIdFeesGet,
} from '@/shared/types';

export const useVaultPage = (vaultId: number) => {
  const { data: feesData, isLoading: isLoadingFees } =
    useGetFundFeesApiV1VaultsVaultIdFeesGet(vaultId, {
      query: {
        queryKey: [QueryKey.VaultFee],
      },
    });

  const fees = React.useMemo(() => {
    const feesArray = feesData?.data.data;

    const deposit =
      (feesArray?.find(({ fund_fee_type }) => fund_fee_type === 'deposit')
        ?.fee_percent ?? 0) / 100;

    const withdrawal =
      (feesArray?.find(({ fund_fee_type }) => fund_fee_type === 'withdrawal')
        ?.fee_percent ?? 0) / 100;

    const performance =
      (feesArray?.find(({ fund_fee_type }) => fund_fee_type === 'performance')
        ?.fee_percent ?? 0) / 100;

    return {
      deposit,
      withdrawal,
      performance,
    };
  }, [feesData]);

  const {
    data,
    isLoading: isLoadingVault,
    isError,
  } = useGetFundApiV1VaultsVaultIdGet(vaultId, {
    query: {
      queryKey: [QueryKey.Vault, vaultId],
    },
  });
  const isOk = data?.data?.ok;
  const vault = data?.data?.data;

  const vaultParams = vault?.parameter;

  const tokens = React.useMemo(() => {
    if (!vault) return [];

    return Array.isArray(vault.tokens) ? vault.tokens : [vault.token];
  }, [vault]);

  const vaultTvl = numeral(vault?.tvl_brutto).format('0.00a');
  const cybroTvl = numeral(vault?.tvl_netto).format('0.00a');

  React.useEffect(() => {
    if (isOk === false) {
      notFound();
    }
  }, [isOk]);

  const { season, isLoadingSeasonalVaultData } = useSeasonVaultChart({
    vaultId,
    isEnabled: isSeasonalVault(vault?.tags),
  });

  return {
    isLoading: isLoadingVault || isLoadingFees,
    isError,
    vault,
    tokens,
    fees,
    vaultParams,
    vaultTvl,
    cybroTvl,

    isLoadingSeasonalVaultData,
    season,
  };
};
