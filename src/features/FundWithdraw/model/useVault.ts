import React from 'react';

import { BigNumber } from 'bignumber.js';
import { utils } from 'ethers';

import { getPriceDexVaultUsd, getPriceErc4626VaultUsd } from '@/entities/fund';
import { getProviderByChainId } from '@/shared/lib';
import { createVaultContract } from '@/shared/lib';
import { FundType, Vault, VaultDex } from '@/shared/types';

export const useVault = (
  vaultAddress: string,
  chainId: number,
  fundType: FundType,
) => {
  const vaultContract = React.useMemo(() => {
    const provider = getProviderByChainId(chainId);

    return createVaultContract(vaultAddress, fundType, provider!);
  }, [vaultAddress, chainId, fundType]);

  const [vaultSymbol, setVaultSymbol] = React.useState<string>('');
  const [sharePrice, setSharePrice] = React.useState('0');

  const [balance, setBalance] = React.useState('0');
  const [isLoadingBalance, setIsLoadingBalance] = React.useState(false);
  const [price, setPrice] = React.useState(0);
  const [isLoadingPrice, setIsLoadingPrice] = React.useState(false);

  const getSymbol = async () => {
    return await vaultContract.symbol();
  };

  const fetchSharePrice = async () => {
    if ('sharePrice' in vaultContract) {
      const decimals = await vaultContract.decimals();
      const sharePriceWei = await vaultContract.sharePrice();

      return utils.formatUnits(sharePriceWei, decimals);
    }

    return '0';
  };

  const fetchBalance = async (address: string) => {
    try {
      setIsLoadingBalance(true);

      const balance = await vaultContract.balanceOf(address);
      const decimals = await vaultContract.decimals();

      setBalance(utils.formatUnits(balance, decimals));
    } finally {
      setIsLoadingBalance(false);
    }
  };

  React.useEffect(() => {
    getSymbol().then(setVaultSymbol);
    fetchSharePrice().then(setSharePrice);
  }, [vaultContract]);

  const fetchPrice = async () => {
    try {
      setIsLoadingPrice(true);
      const fetchPriceFunc =
        fundType === FundType.dex
          ? getPriceDexVaultUsd
          : getPriceErc4626VaultUsd;

      await fetchPriceFunc(vaultContract as VaultDex & Vault, chainId).then(
        (price) =>
          setPrice(new BigNumber(price).dp(2, BigNumber.ROUND_DOWN).toNumber()),
      );
    } finally {
      setIsLoadingPrice(false);
    }
  };

  return {
    vaultSymbol,
    balance,
    fetchBalance,
    isLoadingBalance,
    fetchPrice,
    price,
    isLoadingPrice,
    sharePrice,
    fetchSharePrice,
  };
};
