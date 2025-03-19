import React from 'react';

import { getChainById } from '@lifi/data-types';
import { useSwitchNetwork } from '@web3modal/ethers5/react';
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
import { useMunzenCurrenciesFee } from '@/entities/Munzen';
import {
  getUniqueSelectedTokenId,
  getUniqueTokenId,
  useSwapTokens,
} from '@/entities/SwapToken';
import { isAvailableFiatToken, useFundDeposit } from '@/features/FundDeposit';
import { useRampCalculate, useRampProcessing } from '@/features/RampTokenForm';
import {
  useZapIn,
  getLiFiErrorMessage,
  useZapInCalculate,
} from '@/features/ZapInToken';
import { triggerToast } from '@/shared/lib';
import {
  useErc20Balance,
  useTokenPriceUsd,
  useWeb3ModalAccount,
} from '@/shared/lib';
import { FundType } from '@/shared/types';
import { ToastType } from '@/shared/ui';
import { useFundCalculator } from '@/widgets/FundCalculator';

import { FundDepositContextProps, FundDepositState } from '../lib/types';

export const FundDepositContext =
  React.createContext<FundDepositContextProps | null>(null);

export const FundDepositContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const { findToken } = useSwapTokens();
  const { address, chainId } = useWeb3ModalAccount();
  const { switchNetwork } = useSwitchNetwork();
  const { vault } = useFundCalculator();

  /* Tokens states */
  const [selectedToken, setSelectedToken] = React.useState<SelectedToken>(
    convertToSelectedToken(findToken(vault.tokens[0].address, vault.chain_id)!),
  );

  const defaultToken: SelectedTokenCrypto = React.useMemo(
    () => ({
      isCrypto: true,
      address: vault.tokens[0].address,
      chain: {
        id: vault.chain_id,
        name: vault.chain,
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
    fetchBalance,
    balance: balance,
    isLoading: isLoadingBalance,
  } = useErc20Balance();

  /* Price selected token */
  const {
    fetchPrice,
    price: priceSelectedTokenCrypto,
    isLoading: isLoadingPrice,
  } = useTokenPriceUsd();

  /* Price default vault token */
  const {
    fetchPrice: fetchPriceDefaultToken,
    price: priceDefaultToken,
    isLoading: isLoadingDefaultTokenPrice,
  } = useTokenPriceUsd();

  const { ramp } = useRampProcessing();
  const {
    priceUsd: priceFiatUsd,
    handleCalculate: handleCalculateRamp,
    receiveAmount: rampReceiveAmount,
  } = useRampCalculate();

  const isAvailableFiat = isAvailableFiatToken(defaultToken);
  const fiatConvert =
    defaultToken.symbol === 'USDB' ? 'USDB-BLAST' : 'ETH-BLAST';

  const { fee, isLoading: isLoadingRampFee } = useMunzenCurrenciesFee(
    isAvailableFiat && !selectedToken.isCrypto
      ? `${selectedToken.symbol}_${fiatConvert}`
      : '',
  );

  const [rampError, setRampError] = React.useState<string | null>(null);

  const price = selectedToken.isCrypto
    ? priceSelectedTokenCrypto
    : priceFiatUsd;

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
  }, [
    selectedToken.isCrypto,
    rampReceiveAmount,
    result,
    selectedToken.decimals,
  ]);

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
    if (isSelectedDefaultToken || selectedToken.isCrypto) {
      return;
    }

    const result = handleCalculateRamp({
      amount: debouncedAmount,
      fromCurrency: selectedToken.symbol,
      toCurrency: fiatConvert,
      fee,
    });

    setRampError(result.error?.message ?? null);
  }, [debouncedAmount, isSelectedDefaultToken, selectedToken, fee]);

  /* Calculate zapIn */
  React.useEffect(() => {
    if (
      !parseFloat(debouncedAmount) ||
      isSelectedDefaultToken ||
      !address ||
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
        options: {
          fee: 0.01,
          allowSwitchChain: true,
        },
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

  React.useEffect(() => {
    if (selectedToken.isCrypto) {
      fetchPrice({
        tokenAddress: selectedToken.address,
        chainId: selectedToken.chain.id,
      });
    }
  }, [selectedToken]);

  React.useEffect(() => {
    fetchPriceDefaultToken({
      tokenAddress: defaultToken.address,
      chainId: defaultToken.chain.id,
    });
  }, [defaultToken]);

  const fetchSelectedTokenBalance = React.useCallback(() => {
    if (address && selectedToken.isCrypto) {
      fetchBalance(address, selectedToken.chain.id, selectedToken.address);
    }
  }, [address, selectedToken]);

  React.useEffect(() => {
    fetchSelectedTokenBalance();
  }, [fetchSelectedTokenBalance]);

  const {
    deposit,
    depositState,
    isLoading: isLoadingDeposit,
  } = useFundDeposit();

  const [step, setStep] = React.useState(0);
  const withZapInDeposit = !!result && !isSelectedDefaultToken;
  const withOnRampDeposit =
    rampReceiveAmount !== null &&
    !selectedToken.isCrypto &&
    !isSelectedDefaultToken;

  const handleDeposit = async () => {
    if (vault.chain_id !== chainId) {
      await switchNetwork(vault.chain_id).catch(() => {});
      return;
    }

    try {
      setStep(0);
      let amountDeposit: BigNumberish = withZapInDeposit
        ? utils.formatUnits(result.toAmount, result.toToken.decimals)
        : amount;

      if (withOnRampDeposit) {
        const order = await ramp({
          fromCurrency: selectedToken.symbol,
          toCurrency: fiatConvert,
          fromAmount: amountNumber,
          toWallet: address!,
        });

        amountDeposit = order.toAmount;
      }

      if (withZapInDeposit) {
        amountDeposit = await executeZapIn(result);
        setStep(1);
      }

      let tokenAddress = defaultToken.address;
      if (isSelectedDefaultToken && selectedToken.isCrypto) {
        tokenAddress = selectedToken.address;
      }

      await deposit({
        amount: amountDeposit,
        fundType: vault.fund_type as FundType,
        chainId: vault.chain_id,
        vaultAddress: vault.address,
        tokenAddress,
        onStartDeposit: () => setStep(withZapInDeposit ? 2 : 1),
      });
    } catch (error) {
      console.log('error', error);
    } finally {
      setStep(0);
      setAmount('');
      fetchSelectedTokenBalance();
      resetCalculate();
    }
  };

  const isInsufficientBalance =
    selectedToken.isCrypto &&
    !isLoadingBalance &&
    new BigNumber(amount).isGreaterThan(balance);

  const isValidAmount = amountNumber > 0 && !isInsufficientBalance;

  const isRampInvalid =
    !selectedToken.isCrypto && (!!rampError || isLoadingRampFee);

  const isDisabledSubmit =
    (isLoadingDeposit ||
      isLoadingPrice ||
      isLoadingDefaultTokenPrice ||
      isLoadingBalance ||
      !isValidAmount ||
      isLoadingCalculate ||
      isLoadingZapIn ||
      isRampInvalid ||
      vault.is_deposit_disabled) &&
    vault.chain_id === chainId;

  const submitButtonText = React.useMemo(() => {
    if (vault.chain_id !== chainId) {
      return 'Switch network';
    }

    if (rampError && !selectedToken.isCrypto) {
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
    vault.chain_id,
    chainId,
    selectedToken,
    rampError,
    isLoadingZapIn,
    depositState,
    amountNumber,
    balance,
    isLoadingPrice,
    isLoadingCalculate,
  ]);

  const isDisabledInput =
    isLoadingDeposit || isLoadingCalculate || isLoadingZapIn;

  const isProcessing = isLoadingDeposit || isLoadingZapIn;
  return (
    <FundDepositContext.Provider
      value={{
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
        isDisabledInput,
        isLoadingCalculate,
        receivedAmount,
        isProcessing,
        step,
        withZapInDeposit,
      }}
    >
      {children}
    </FundDepositContext.Provider>
  );
};
