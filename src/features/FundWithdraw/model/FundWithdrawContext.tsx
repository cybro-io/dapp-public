import React from 'react';

import { getChainById } from '@lifi/data-types';
import { useSwitchNetwork } from '@web3modal/ethers5/react';
import { BigNumber } from 'bignumber.js';
import { BigNumberish, utils } from 'ethers';
import { useCountdown } from 'usehooks-ts';

import { convertToSelectedToken, SelectedTokenCrypto } from '@/entities/fund';
import { getUniqueTokenId, useSwapTokens } from '@/entities/SwapToken';
import { useFundWithdraw } from '@/features/FundWithdraw';
import { useTokenPriceUsd, useWeb3ModalAccount } from '@/shared/lib';
import { FundType } from '@/shared/types';
import { useFundCalculator } from '@/widgets/FundCalculator';

import { FundWithdrawContextProps, FundWithdrawState } from '../lib/types';

import { useVault } from './useVault';

export const FundWithdrawContext =
  React.createContext<FundWithdrawContextProps | null>(null);

export const FundWithdrawContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const { findToken } = useSwapTokens();

  const { address, chainId } = useWeb3ModalAccount();
  const { switchNetwork } = useSwitchNetwork();
  const { vault } = useFundCalculator();

  const defaultTokenIds = vault.tokens.map((token) =>
    getUniqueTokenId(token.address, vault.chain_id),
  );

  /* Tokens states */
  const [selectedToken, setSelectedToken] = React.useState<SelectedTokenCrypto>(
    convertToSelectedToken(findToken(vault.tokens[0].address, vault.chain_id)!),
  );

  /* Balance vault asset */
  const {
    vaultSymbol,
    isLoadingBalance,
    balance,
    fetchBalance,

    fetchPrice: fetchVaultPrice,
    price: vaultPrice,
    isLoadingPrice: isLoadingVaultPrice,
    sharePrice,
  } = useVault(vault.address, vault.chain_id, vault.fund_type as FundType);

  const vaultToken: SelectedTokenCrypto = React.useMemo(
    () => ({
      isCrypto: true,
      address: vault.address,
      chain: {
        id: vault.chain_id,
        name: vault.chain,
        logoUrl: getChainById(vault.chain_id).logoURI ?? '',
      },
      decimals: 18,
      symbol: vaultSymbol,
      logoUrl: '',
    }),
    [vault, vaultSymbol],
  );

  const selectedTokenId = getUniqueTokenId(
    selectedToken.address,
    selectedToken.chain.id,
  );

  /* Amount states */
  const [amount, setAmount] = React.useState('');
  const amountNumber = new BigNumber(amount)
    .dp(6, BigNumber.ROUND_DOWN)
    .toNumber();

  /* Price selected token */
  const {
    fetchPrice,
    price: priceSelectedToken,
    isLoading: isLoadingPrice,
  } = useTokenPriceUsd();

  React.useEffect(() => {
    if (selectedToken.isCrypto) {
      fetchPrice({
        tokenAddress: selectedToken.address,
        chainId: selectedToken.chain.id,
      });
    }
  }, [selectedToken]);

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
    let price: BigNumberish = 0;

    if (!amount) {
      return price;
    }

    if (vault.fund_type === FundType.dex) {
      price = (vaultPrice / priceSelectedToken) * Number(amount);
    } else {
      const weiAmount = utils.parseUnits(amount, selectedToken.decimals);

      const weiReceive = weiAmount
        .mul(sharePrice)
        .div(BigInt(10 ** selectedToken.decimals));

      price = utils.formatUnits(weiReceive, selectedToken.decimals);
    }

    return new BigNumber(price).dp(6, BigNumber.ROUND_DOWN).toNumber();
  }, [
    vault.fund_type,
    vaultPrice,
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
    if (!selectedToken.isCrypto) {
      return;
    }

    if (vault.chain_id !== chainId) {
      await switchNetwork(vault.chain_id).catch(() => {});
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
      isLoadingVaultPrice ||
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
        isLoadingVaultPrice,
        vaultPrice,
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
