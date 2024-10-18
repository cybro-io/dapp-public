'use client';

import React from 'react';

import { ethers, providers } from 'ethers';

import { NATIVE_TOKENS } from '@/shared/const';
import { getSharePriceDexVault } from '@/shared/hooks/vault/getSharePriceDexVault';
import {
  Money,
  Nullable,
  Token,
  Vault,
  VaultDex,
  VaultMin,
} from '@/shared/types';
import { convertToUsd, fromWei, isInvalid } from '@/shared/utils';

type BalanceContextProps = {
  balance: Record<string, Money>;
  vaultDeposit: Record<string, Money>;
  vaultDepositUsd: Record<string, Money>;
  refetchBalance: (
    provider: Nullable<providers.Provider>,
    signer: Nullable<ethers.Signer>,
    tokenContract: Nullable<Token>,
    vaultContract?: Nullable<Vault | VaultMin | VaultDex>,
    tokenPrice?: Nullable<number>,
  ) => void;
};

const BalanceContext = React.createContext<BalanceContextProps | undefined>(
  undefined,
);

export const BalanceProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [balance, setBalance] = React.useState<Record<string, Money>>({});
  const [vaultDeposit, setVaultDeposit] = React.useState<Record<string, Money>>(
    {},
  );
  const [vaultDepositUsd, setVaultDepositUsd] = React.useState<
    Record<string, Money>
  >({});

  const getUserBalance = React.useCallback(
    async (
      provider: Nullable<providers.Provider>,
      signer: Nullable<ethers.Signer>,
      tokenContract: Nullable<Token>,
    ) => {
      if (provider && signer && tokenContract) {
        let balance;
        let decimals;

        const tokenAddress = tokenContract.address as string;
        const userAddress = await signer.getAddress();

        if (!tokenContract) {
          throw new Error('Token not found');
        }

        if (NATIVE_TOKENS.includes(tokenAddress)) {
          balance = await provider.getBalance(userAddress);
          decimals = 18;
        } else {
          balance = await tokenContract.balanceOf(userAddress);
          decimals = await tokenContract.decimals();
        }

        setBalance((prevBalance) => ({
          ...prevBalance,
          [tokenAddress]: fromWei(balance, Number(decimals)),
        }));
      }
    },
    [],
  );

  const getVaultDeposit = React.useCallback(
    async (
      vaultContract: Nullable<Vault | VaultMin | VaultDex>,
      signer: Nullable<ethers.Signer>,
      tokenPrice: Nullable<number>,
    ) => {
      if (vaultContract && signer && !isInvalid(tokenPrice)) {
        const vaultAddress = vaultContract.address as string;
        const userAddress = await signer.getAddress();
        const decimals = Number(await vaultContract.decimals());

        const userTotalShares = await vaultContract.balanceOf(userAddress);

        const availableFunds = fromWei(userTotalShares, decimals);

        const chainId = await signer.getChainId();

        const isErcVault = 'sharePrice' in vaultContract;

        if (isErcVault) {
          const sharePrice = await vaultContract.sharePrice();

          // todo: check calculation, after change logic
          const availableFundsTokens = availableFunds
            ? userTotalShares.mul(sharePrice).div(BigInt(10 ** decimals))
            : 0;

          const availableFundsUsd = convertToUsd(
            fromWei(availableFundsTokens, decimals),
            tokenPrice,
          );

          setVaultDepositUsd((prevState) => ({
            ...prevState,
            [vaultAddress]: availableFundsUsd,
          }));
        } else {
          const sharePriceUsdBN = await getSharePriceDexVault(
            vaultAddress,
            chainId,
            vaultContract.provider,
          );

          const sharePriceUsd = fromWei(sharePriceUsdBN, decimals);

          setVaultDepositUsd((prevState) => ({
            ...prevState,
            [vaultAddress]: convertToUsd(availableFunds, sharePriceUsd ?? 0),
          }));
        }

        setVaultDeposit((prevState) => ({
          ...prevState,
          [vaultAddress]: availableFunds,
        }));
      }
    },
    [],
  );

  const refetchBalance = React.useCallback(
    (
      provider: Nullable<providers.Provider>,
      signer: Nullable<ethers.Signer>,
      tokenContract: Nullable<Token>,
      vaultContract?: Nullable<Vault | VaultMin | VaultDex>,
      tokenPrice?: Nullable<number>,
    ) => {
      getUserBalance(provider, signer, tokenContract);
      getVaultDeposit(vaultContract, signer, tokenPrice);
    },
    [getUserBalance, getVaultDeposit],
  );

  const contextValue = React.useMemo(
    () => ({ balance, vaultDeposit, vaultDepositUsd, refetchBalance }),
    [balance, refetchBalance, vaultDeposit, vaultDepositUsd],
  );

  return (
    <BalanceContext.Provider value={contextValue}>
      {children}
    </BalanceContext.Provider>
  );
};

export const useBalanceContext = (): BalanceContextProps => {
  const context = React.useContext(BalanceContext);

  if (!context) {
    throw new Error('useBalanceContext must be used within an EthersProvider');
  }

  return context;
};
