import React from 'react';

import { useBalanceContext, useEthers } from '@/app/providers';
import { QueryKey } from '@/shared/const';
import { useWeb3ModalAccount } from '@/shared/lib';
import {
  Nullable,
  Token,
  useGetPriceApiV1MarketDataPriceGet,
  Vault,
  VaultMin,
} from '@/shared/types';

export const useBalance = (
  tokenContract: Nullable<Token>,
  vaultContract?: Nullable<Vault | VaultMin>,
  chainId?: number,
  token?: string,
) => {
  const { isConnected } = useWeb3ModalAccount();
  const { provider, signer, tokens } = useEthers();
  const { balance, refetchBalance, vaultDeposit, vaultDepositUsd } =
    useBalanceContext();
  const vaultAddress = vaultContract?.address as string;
  const tokenAddress = tokenContract?.address as string;

  const { data } = useGetPriceApiV1MarketDataPriceGet(
    {
      token: token || '',
      chain_id: chainId || 0,
    },
    {
      query: {
        queryKey: [QueryKey.TokenPrice, token, chainId],
        enabled: Boolean(token) && Boolean(chainId),
      },
    },
  );

  const tokenPrice = Number(data?.data?.data?.price);

  React.useEffect(() => {
    if (provider && signer && tokenContract && isConnected) {
      refetchBalance(
        provider,
        signer,
        tokenContract,
        vaultContract,
        tokenPrice,
      );
    }
  }, [
    provider,
    signer,
    tokens,
    refetchBalance,
    tokenContract,
    isConnected,
    vaultContract,
    tokenPrice,
  ]);

  return {
    balance: balance[tokenAddress],
    vaultDeposit: vaultDeposit[vaultAddress],
    vaultDepositUsd: vaultDepositUsd[vaultAddress],
    refetchBalance: () =>
      refetchBalance(
        provider,
        signer,
        tokenContract,
        vaultContract,
        tokenPrice,
      ),
  };
};
