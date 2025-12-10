import React, { useEffect } from 'react';

import { getChainById } from '@lifi/data-types';
import { useAppKitNetwork } from '@reown/appkit/react';
import { BigNumber } from 'bignumber.js';
import { useCountdown } from 'usehooks-ts';

import { convertToSelectedToken, SelectedTokenCrypto } from '@/entities/fund';
import {
  getUniqueSelectedTokenId,
  getUniqueTokenId,
  useSwapTokens,
} from '@/entities/SwapToken';
import { useFundWithdraw } from '@/features/FundWithdraw';
import { getChain, useTokenPriceUsd, useAppKitAccount } from '@/shared/lib';
import { FundType } from '@/shared/types';
import { useFundCalculator } from '@/widgets/FundCalculator';

import { FundWithdrawContextProps, FundWithdrawState } from '../lib/types';

import { useVault } from './useVault';

export const FundWithdrawContext =
  React.createContext<FundWithdrawContextProps | null>(null);

export const FundWithdrawContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const { findToken, isLoading: isLoadingTokens } = useSwapTokens();

  const { address } = useAppKitAccount();
  const { switchNetwork, chainId } = useAppKitNetwork();
  const { vault } = useFundCalculator();

  const defaultTokenIds = vault.tokens.map((token) =>
    getUniqueTokenId(token.address, vault.chain_id),
  );

  /* Tokens states */
  const [selectedToken, setSelectedToken] =
    React.useState<SelectedTokenCrypto | null>(
      convertToSelectedToken(
        findToken(vault.tokens[0].address, vault.chain_id),
      ),
    );

  useEffect(() => {
    if (!isLoadingTokens) {
      setSelectedToken(
        convertToSelectedToken(
          findToken(vault.tokens[0].address, vault.chain_id),
        ),
      );
    }
  }, [findToken, isLoadingTokens, vault]);

  /* Balance vault asset */
  const {
    vaultSymbol,
    isLoadingBalance,
    balance,
    fetchBalance,

    fetchPrice: fetchVaultPrice,
    price: vaultTokenPriceUsd,
    isLoadingPrice: isLoadingVaultTokenPriceUsd,
    sharePrice,
  } = useVault(vault.address, vault.chain_id, vault.fund_type as FundType);

  const vaultToken: SelectedTokenCrypto = React.useMemo(
    () => ({
      isCrypto: true,
      address: vault.address,
      chain: {
        id: vault.chain_id,
        name: vault.chain_name,
        logoUrl: getChainById(vault.chain_id).logoURI ?? '',
      },
      decimals: 18,
      symbol: vaultSymbol,
      logoUrl: '',
    }),
    [vault, vaultSymbol],
  );

  const selectedTokenId = getUniqueSelectedTokenId(selectedToken);

  /* Amount states */
  const [amount, setAmount] = React.useState('');
  const amountNumber = new BigNumber(amount)
    .dp(6, BigNumber.ROUND_DOWN)
    .toNumber();

  /* Price selected token */
  const { price: priceSelectedToken, isLoading: isLoadingPrice } =
    useTokenPriceUsd(
      selectedToken && selectedToken.isCrypto
        ? {
            address: selectedToken.address,
            chainId: selectedToken.chain.id,
          }
        : null,
    );

  React.useEffect(() => {
    fetchVaultPrice();
  }, [vaultToken]);

  const fetchSelectedTokenBalance = React.useCallback(() => {
    if (address) {
      fetchBalance(address);
    }
  }, [address, selectedToken]);

  React.useEffect(() => {
    fetchSelectedTokenBalance();
  }, [fetchSelectedTokenBalance]);

  const receiveAmount = React.useMemo(() => {
    let price: number = 0;

    if (!amount) {
      return price;
    }

    if (vault.fund_type === FundType.dex) {
      price = new BigNumber(vaultTokenPriceUsd)
        .div(priceSelectedToken)
        .multipliedBy(amount)
        .toNumber();
    } else {
      price = new BigNumber(amount).multipliedBy(sharePrice).toNumber();
    }

    return new BigNumber(price).dp(6, BigNumber.ROUND_DOWN).toNumber();
  }, [
    vault.fund_type,
    vaultTokenPriceUsd,
    priceSelectedToken,
    amount,
    selectedToken,
    sharePrice,
  ]);

  const {
    withdraw,
    withdrawState,
    isLoading: isLoadingWithdraw,
  } = useFundWithdraw();

  const [step, setStep] = React.useState(0);
  const handleWithdraw = async () => {
    if (!selectedToken || !selectedToken.isCrypto) {
      return;
    }

    if (vault.chain_id !== chainId) {
      switchNetwork(getChain(vault.chain_id));
      return;
    }

    try {
      setStep(0);
      await withdraw({
        amount,
        fundType: vault.fund_type as FundType,
        chainId: vault.chain_id,
        vaultAddress: vault.address,
        tokenAddress: selectedToken.address,
      });
    } finally {
      setStep(0);
      setAmount('');
      fetchSelectedTokenBalance();
    }
  };

  const isInsufficientBalance =
    !isLoadingBalance && new BigNumber(amount).isGreaterThan(balance);

  const isValidAmount = amountNumber > 0 && !isInsufficientBalance;

  const isDisabledSubmit =
    (isLoadingWithdraw ||
      isLoadingPrice ||
      isLoadingVaultTokenPriceUsd ||
      isLoadingBalance ||
      !isValidAmount) &&
    vault.chain_id === chainId;

  const submitButtonText = React.useMemo(() => {
    if (vault.chain_id !== chainId) {
      return 'Switch Network';
    }

    switch (withdrawState) {
      case FundWithdrawState.NONE: {
        if (isInsufficientBalance) {
          return 'Insufficient Balance';
        }

        return null;
      }
      case FundWithdrawState.REDEEM:
        return 'Redeeming...';
    }
    return null;
  }, [vault.chain_id, chainId, withdrawState, isInsufficientBalance]);

  const isDisabledInput = isLoadingWithdraw;

  const [timer, { startCountdown, stopCountdown, resetCountdown }] =
    useCountdown({
      countStart: 15,
      intervalMs: 1000,
    });

  React.useEffect(() => {
    startCountdown();
    return () => {
      stopCountdown();
    };
  }, []);

  React.useEffect(() => {
    if (!timer) {
      fetchVaultPrice();
      resetCountdown();
      startCountdown();
    }
  }, [timer]);

  return (
    <FundWithdrawContext.Provider
      value={{
        selectedTokenId,
        vaultToken,
        selectedToken,
        setSelectedToken,
        priceSelectedToken,
        isLoadingVaultTokenPriceUsd,
        vaultTokenPriceUsd,
        isLoadingPrice,
        balance,
        isLoadingBalance,
        amount,
        amountNumber,
        setAmount,
        handleWithdraw,
        submitButtonText,
        isDisabledSubmit,
        isDisabledInput,
        sharePrice,

        // wi
        defaultTokenIds,
        vaultSymbol,
        receiveAmount,
        timer,
        isLoadingWithdraw,
        step,
      }}
    >
      {children}
    </FundWithdrawContext.Provider>
  );
};
