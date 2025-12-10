import React, { useCallback, useEffect, useMemo } from 'react';

import { getChainById } from '@lifi/data-types';
import { useAppKitNetwork } from '@reown/appkit/react';
import { BigNumber } from 'bignumber.js';
import { BigNumberish, utils } from 'ethers';
import { useDebounceValue } from 'usehooks-ts';
import { zeroAddress } from 'viem';

import {
  convertToSelectedToken,
  PeriodTab,
  SelectedToken,
  SelectedTokenCrypto,
} from '@/entities/fund';
import { liFiDefaultRouteOptions } from '@/entities/LiFi';
import { useMunzenCurrenciesFee } from '@/entities/Munzen';
import {
  getUniqueSelectedTokenId,
  getUniqueTokenId,
  useSwapTokens,
} from '@/entities/SwapToken';
import {
  getTickerWithNetwork,
  isAvailableFiatToken,
  useFundDeposit,
} from '@/features/FundDeposit';
import { useRampCalculate, useRampProcessing } from '@/features/RampTokenForm';
import { useSelectTokenModal } from '@/features/SelectToken';
import {
  getLiFiErrorMessage,
  useZapIn,
  useZapInCalculate,
} from '@/features/ZapInToken';
import {
  getChain,
  triggerToast,
  useAppKitAccount,
  useGetErc20Balance,
  useTokenBalancesByChain,
  useTokenPriceUsd,
} from '@/shared/lib';
import { FundType } from '@/shared/types';
import { ToastType } from '@/shared/ui';
import { useFundCalculator } from '@/widgets/FundCalculator';

import { FundDepositState } from '../lib/types';
import { useFundDepositReferral } from '../model/useFundDepositReferral';

export const FundDepositContext = React.createContext<ReturnType<
  typeof useFundDepositValues
> | null>(null);

const useFundDepositValues = () => {
  const { highestToken, isLoading: isLoadingBalances } =
    useTokenBalancesByChain();
  const { findToken } = useSwapTokens();
  const { address } = useAppKitAccount();
  const { switchNetwork, chainId } = useAppKitNetwork();
  const { vault, defaultAddress, defaultSelectedToken } = useFundCalculator();
  const referral = useFundDepositReferral();

  const depositAddress = defaultAddress ?? address;

  /* Tokens states */
  const [selectedToken, setSelectedToken] =
    React.useState<SelectedToken | null>(defaultSelectedToken ?? null);

  const resetSelectedToken = useCallback(() => {
    let token: SelectedTokenCrypto | SelectedToken | undefined | null =
      defaultSelectedToken;

    if (!token && highestToken) {
      token = convertToSelectedToken(highestToken);
    }

    if (!token) {
      const findItem = findToken(vault.tokens[0].address, vault.chain_id);

      if (findItem) {
        token = convertToSelectedToken(findItem);
      }
    }

    if (token) {
      setSelectedToken(token);
    }
  }, [
    defaultSelectedToken,
    findToken,
    highestToken,
    vault.chain_id,
    vault.tokens,
  ]);

  useEffect(() => {
    if (!selectedToken && !isLoadingBalances) {
      resetSelectedToken();
    }
  }, [selectedToken, resetSelectedToken, isLoadingBalances]);

  const defaultTokenIds = vault.tokens.map((token) =>
    getUniqueTokenId(token.address, vault.chain_id),
  );

  const defaultToken: SelectedTokenCrypto = React.useMemo(
    () => ({
      isCrypto: true,
      address: vault.tokens[0].address,
      chain: {
        id: vault.chain_id,
        name: vault.chain_name,
        logoUrl: getChainById(vault.chain_id).logoURI ?? '',
      },
      decimals: vault.tokens[0].decimals,
      symbol: vault.tokens[0].name,
      logoUrl: vault.tokens[0].icon ?? '',
    }),
    [vault],
  );

  const selectedTokenId = getUniqueSelectedTokenId(selectedToken);

  const isSelectedDefaultToken = React.useMemo(() => {
    const tokensIds = vault.tokens.map((token) =>
      getUniqueTokenId(token.address, vault.chain_id),
    );

    return tokensIds.includes(selectedTokenId);
  }, [selectedTokenId, vault.chain_id, vault.tokens]);

  /* Amount states */
  const [amount, setAmount] = React.useState('');
  const [debouncedAmount] = useDebounceValue(amount, 700);
  const amountNumber = new BigNumber(amount)
    .dp(6, BigNumber.ROUND_DOWN)
    .toNumber();

  /* Period state */
  const [period, setPeriod] = React.useState(PeriodTab.Year);

  /* Apy from period */
  const periodApy = React.useMemo(() => {
    const apyDivider = {
      [PeriodTab.Month]: 12,
      [PeriodTab.Quarter]: 4,
      [PeriodTab.Year]: 1,
    };

    return vault.apy / apyDivider[period];
  }, [vault.apy, period]);

  /* Balance selected toke */
  const {
    balance,
    isLoading: isLoadingBalance,
    refetch: refetchBalance,
  } = useGetErc20Balance({
    walletAddress: address,
    chainId:
      selectedToken && selectedToken.isCrypto ? selectedToken.chain.id : null,
    tokenAddress:
      selectedToken && selectedToken.isCrypto ? selectedToken.address : null,
  });

  /* Price selected token */
  const { price: priceSelectedTokenCrypto, isLoading: isLoadingPrice } =
    useTokenPriceUsd(
      selectedToken && selectedToken.isCrypto
        ? {
            address: selectedToken.address,
            chainId: selectedToken.chain.id,
          }
        : null,
    );

  /* Price default vault token */
  const { price: priceDefaultToken, isLoading: isLoadingDefaultTokenPrice } =
    useTokenPriceUsd({
      address: defaultToken.address,
      chainId: defaultToken.chain.id,
    });

  const { ramp } = useRampProcessing();
  const {
    priceUsd: priceFiatUsd,
    handleCalculate: handleCalculateRamp,
    receiveAmount: rampReceiveAmount,
  } = useRampCalculate();

  const isAvailableFiat = isAvailableFiatToken(defaultToken);
  const fiatConvert = getTickerWithNetwork(defaultToken);

  const { fee, isLoading: isLoadingRampFee } = useMunzenCurrenciesFee(
    isAvailableFiat && selectedToken && !selectedToken.isCrypto
      ? `${selectedToken.symbol}_${fiatConvert}`
      : '',
  );

  const [rampError, setRampError] = React.useState<string | null>(null);

  const price = useMemo(() => {
    if (!selectedToken) {
      return '';
    }

    return selectedToken.isCrypto ? priceSelectedTokenCrypto : priceFiatUsd;
  }, [priceFiatUsd, priceSelectedTokenCrypto, selectedToken]);

  /* ZapIn */
  const { executeZapIn, isLoading: isLoadingZapIn } = useZapIn();
  const {
    fetchCalculate,
    isLoading: isLoadingCalculate,
    result,
    resetCalculate,
  } = useZapInCalculate();

  /* Received amount from zapIn */
  const receivedAmount = React.useMemo(() => {
    if (!selectedToken) {
      return 0;
    }

    if (!selectedToken.isCrypto) {
      if (rampReceiveAmount !== null) return rampReceiveAmount;

      return 0;
    }

    if (!result) return 0;

    const receivedStr = utils.formatUnits(
      result.toAmount,
      result.toToken.decimals,
    );

    return new BigNumber(receivedStr).dp(6).toNumber();
  }, [selectedToken, rampReceiveAmount, result]);

  /* Profit states */
  const profit = React.useMemo(() => {
    const calcAmount = isSelectedDefaultToken ? amountNumber : receivedAmount;

    return calcAmount * (periodApy / 100);
  }, [periodApy, amountNumber, receivedAmount, isSelectedDefaultToken]);

  const profitUsd = React.useMemo(() => {
    const calcPrice = isSelectedDefaultToken ? price : priceDefaultToken;

    if (!profit) return 0;

    return new BigNumber(profit)
      .multipliedBy(calcPrice)
      .dp(2, BigNumber.ROUND_UP)
      .toNumber();
  }, [profit, price, priceDefaultToken, isSelectedDefaultToken]);

  /* Calculate onRamp */
  React.useEffect(() => {
    if (
      isSelectedDefaultToken ||
      !selectedToken ||
      selectedToken.isCrypto ||
      !fiatConvert
    ) {
      return;
    }

    const result = handleCalculateRamp({
      amount: debouncedAmount,
      fromCurrency: selectedToken.symbol,
      toCurrency: fiatConvert,
      fee,
    });

    setRampError(result.error?.message ?? null);
  }, [
    fiatConvert,
    debouncedAmount,
    isSelectedDefaultToken,
    selectedToken,
    fee,
  ]);

  /* Calculate zapIn */
  React.useEffect(() => {
    if (
      !parseFloat(debouncedAmount) ||
      isSelectedDefaultToken ||
      !address ||
      !selectedToken ||
      !selectedToken.isCrypto
    ) {
      return;
    }

    handleCalculateRate(debouncedAmount, address, selectedToken, defaultToken);
  }, [
    debouncedAmount,
    isSelectedDefaultToken,
    address,
    selectedToken,
    defaultToken,
  ]);

  const handleCalculateRate = async (
    amount: string,
    address: string,
    fromToken: SelectedTokenCrypto,
    toToken: SelectedTokenCrypto,
  ) => {
    try {
      await fetchCalculate({
        fromChainId: fromToken.chain.id,
        toChainId: toToken.chain.id,
        fromTokenAddress: fromToken.address ? fromToken.address : zeroAddress,
        toTokenAddress: toToken.address ? toToken.address : zeroAddress,
        fromAmount: utils.parseUnits(amount, fromToken.decimals).toString(),
        fromAddress: address,
        options: liFiDefaultRouteOptions,
      });
    } catch (error) {
      setAmount('');

      const description = getLiFiErrorMessage(error);

      triggerToast({
        message: `Something went wrong`,
        description,
        type: ToastType.Error,
      });
    }
  };

  const {
    deposit,
    depositState,
    isLoading: isLoadingDeposit,
  } = useFundDeposit();

  const [step, setStep] = React.useState(0);
  const withZapInDeposit = !!result && !isSelectedDefaultToken;
  const withOnRampDeposit =
    rampReceiveAmount !== null &&
    selectedToken &&
    !selectedToken.isCrypto &&
    !isSelectedDefaultToken;

  const handleDeposit = async ({
    withResetAmount = true,
    onSuccessDeposit,
    onErrorDeposit,
    onStartDeposit,
    onPrepareDeposit,
  }: {
    withResetAmount?: boolean;
    onSuccessDeposit?: () => void;
    onErrorDeposit?: (reason: string) => void;
    onStartDeposit?: () => void;
    onPrepareDeposit?: () => void;
  }) => {
    if (!depositAddress || !selectedToken) {
      return;
    }

    if (isNeedSwitchNetwork) {
      switchNetwork(getChain(selectedToken.chain.id));
      return;
    }

    const setReferralResponse =
      await referral.handleSetReferral(depositAddress);

    if (!setReferralResponse) {
      return;
    }

    try {
      if (!selectedToken) {
        throw new Error('Not found currency');
      }

      setStep(0);
      let amountDeposit: BigNumberish = withZapInDeposit
        ? utils.formatUnits(result.toAmount, result.toToken.decimals)
        : amount;

      if (withOnRampDeposit) {
        if (!fiatConvert) {
          throw new Error('Not found currency');
        }

        const order = await ramp({
          fromCurrency: selectedToken.symbol,
          toCurrency: fiatConvert,
          fromAmount: amountNumber,
          toWallet: address!,
        });

        amountDeposit = order.toAmount;
      }

      onPrepareDeposit?.();

      let tokenAddress = defaultToken.address;
      if (isSelectedDefaultToken && selectedToken.isCrypto) {
        tokenAddress = selectedToken.address;
      }

      if (withZapInDeposit) {
        amountDeposit = await executeZapIn({
          route: result,
          onSuccess: () => {
            switchNetwork(getChain(vault.chain_id));
          },
        });
        setStep(1);
      }

      await deposit({
        amount: amountDeposit,
        fundType: vault.fund_type as FundType,
        chainId: vault.chain_id,
        vaultAddress: vault.address,
        tokenAddress,
        depositAddress,
        onStartDeposit: () => {
          setStep(withZapInDeposit ? 2 : 1);
          onStartDeposit?.();
        },
        onSuccessDeposit,
        onErrorDeposit,
        defaultToken,
      });
    } catch (error) {
      const Error = error as { reason?: string };

      Promise.reject(error);
      onErrorDeposit?.(Error?.reason ?? 'Unknown error');
    } finally {
      setStep(0);
      if (withResetAmount) {
        setAmount('');
      }
      refetchBalance().finally();
      resetCalculate();
    }
  };

  const isInsufficientBalance =
    selectedToken &&
    selectedToken.isCrypto &&
    !isLoadingBalance &&
    new BigNumber(amount).isGreaterThan(balance);

  const isValidAmount = amountNumber > 0 && !isInsufficientBalance;

  const isRampInvalid =
    selectedToken &&
    !selectedToken.isCrypto &&
    (!!rampError || isLoadingRampFee);

  const isNeedSwitchNetwork =
    selectedToken &&
    selectedToken.isCrypto &&
    selectedToken.chain.id !== chainId;

  const isDisabledSubmit =
    (isLoadingDeposit ||
      isLoadingPrice ||
      isLoadingDefaultTokenPrice ||
      isLoadingBalance ||
      !isValidAmount ||
      isLoadingCalculate ||
      isLoadingZapIn ||
      isRampInvalid ||
      vault.is_deposit_disabled ||
      referral.isValidRefCode === false ||
      referral.isLoadingValidRefCode) &&
    !isNeedSwitchNetwork;

  const submitButtonText = React.useMemo(() => {
    if (isNeedSwitchNetwork) {
      return 'Switch network';
    }

    if (rampError && selectedToken && !selectedToken.isCrypto) {
      return rampError;
    }

    if (isLoadingCalculate) {
      return 'Finding best rates...';
    }

    if (isLoadingZapIn) {
      return 'Swapping...';
    }

    switch (depositState) {
      case FundDepositState.NONE: {
        if (isInsufficientBalance) {
          return 'Insufficient Balance';
        }

        return null;
      }
      case FundDepositState.DEPOSIT:
        return 'Depositing...';
      case FundDepositState.APPROVE:
        return 'Approving...';
    }
    return null;
  }, [
    isNeedSwitchNetwork,
    rampError,
    selectedToken,
    isLoadingCalculate,
    isLoadingZapIn,
    depositState,
    isInsufficientBalance,
  ]);

  const isDisabledInput =
    isLoadingDeposit || isLoadingCalculate || isLoadingZapIn;

  const isProcessing = isLoadingDeposit || isLoadingZapIn;

  const onClickPercent = (value: number) => {
    if (!balance) {
      return;
    }

    setAmount(
      new BigNumber(balance)
        .multipliedBy(value)
        .dp(value === 1 ? 18 : 6)
        .toFixed(),
    );
  };

  const statuses = React.useMemo(() => {
    const array = [
      'Approving transaction...',
      `Sending transaction on ${defaultToken.chain.name}...`,
    ];

    if (withZapInDeposit) {
      array.unshift('Processing swap...');
    }

    return array;
  }, [withZapInDeposit, defaultToken]);

  const { openModal } = useSelectTokenModal();

  const handleSelectToken = () => {
    openModal({
      selectedTokenId,
      onSelectToken: (token) => {
        setAmount('');
        setSelectedToken(token);
      },
      nativeTokensId: defaultTokenIds,
      withFiat: isAvailableFiatToken(defaultToken),
    });
  };

  return {
    withOnRampDeposit,
    handleSelectToken,
    selectedTokenId,
    defaultToken,
    selectedToken,
    setSelectedToken,
    isSelectedDefaultToken,
    price,
    priceDefaultToken,
    isLoadingDefaultTokenPrice,
    isLoadingPrice,
    balance,
    isLoadingBalance,
    amount,
    amountNumber,
    setAmount,
    period,
    setPeriod,
    periodApy,
    profit,
    profitUsd,
    handleDeposit,
    submitButtonText,
    isDisabledSubmit,
    isValidAmount,
    isDisabledInput,
    isLoadingCalculate,
    receivedAmount,
    isProcessing,
    step,
    withZapInDeposit,
    onClickPercent,
    statuses,
    resetSelectedToken,
    referral,
    defaultTokenIds,
  };
};

export const FundDepositContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const value = useFundDepositValues();
  return (
    <FundDepositContext.Provider value={value}>
      {children}
    </FundDepositContext.Provider>
  );
};
