import React from 'react';

import { notFound } from 'next/navigation';
import numeral from 'numeral';

import { QueryKey } from '@/shared/const';
import { useWeb3ModalAccount } from '@/shared/lib';
import {
  useGetFundApiV1VaultsVaultIdGet,
  useGetFundFeesApiV1VaultsVaultIdFeesGet,
} from '@/shared/types';

export const useVaultPage = (vaultId: number) => {
  const { address } = useWeb3ModalAccount();

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

    const profit =
      (feesArray?.find(({ fund_fee_type }) => fund_fee_type === 'profit')
        ?.fee_percent ?? 0) / 100;

    return {
      deposit,
      withdrawal,
      profit,
    };
  }, [feesData]);

  const {
    data,
    isLoading: isLoadingVault,
    isError,
  } = useGetFundApiV1VaultsVaultIdGet(
    vaultId,
    { address },
    {
      query: {
        queryKey: [QueryKey.Vault, vaultId, address],
      },
    },
  );
  const isOk = data?.data?.ok;
  const vault = data?.data?.data;

  const vaultParams = vault?.parameter;

  const tokens = React.useMemo(() => {
    if (!vault) return [];

    return Array.isArray(vault.tokens) ? vault.tokens : [vault.token];
  }, [vault]);

  const vaultTvl = numeral(vault?.tvl).format('0.00a');
  const cybroTvl = numeral(vault?.overall_investments_usd).format('0.00a');

  const withDistribution = vault?.fund_type === 'one_click';

  React.useEffect(() => {
    if (isOk === false) {
      notFound();
    }
  }, [isOk]);

  return {
    isLoading: isLoadingVault || isLoadingFees,
    isError,
    vault,
    tokens,
    fees,
    vaultParams,
    vaultTvl,
    cybroTvl,
    withDistribution,
  };
};
