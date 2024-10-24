import React from 'react';

import { LiFiStep } from '@lifi/sdk';
import { utils } from 'ethers';
import { getTokenPriceUsd, Token } from 'symbiosis-js-sdk';
import { zeroAddress } from 'viem';

import { PeriodTab } from '@/entities/DepositCalculator';
import { useSwapTokens } from '@/entities/SwapToken';
import {
  getLiFiErrorMessage,
  useZapInCalculate,
} from '@/features/ZapInToken/model/useZapInCalculate';
import { useToast } from '@/shared/hooks';
import { useWeb3ModalAccount } from '@/shared/lib';
import {
  Maybe,
  Money,
  Nullable,
  Token as TokenContract,
  useGetPriceApiV1MarketDataPriceGet,
} from '@/shared/types';
import { ToastType } from '@/shared/ui';
import { convertToUsd, VaultCurrency } from '@/shared/utils';

type UseDepositCalculator = {
  availableFundsUsd: Money;
  entryAmountUsd: Money;
  apy: number;
  text: string;
  profitTokens: Money;
  profitUsd: Money;
  balanceAfter: Money;
  balanceAfterText: string;
  isLoadingCalculate: boolean;
  swapCalculate: LiFiStep | null;
  selectedTokenPriceInUsd: number;
};

export const useDepositCalculator = (
  amountToDeposit: Maybe<string> = '0',
  balance: Money | string,
  token: VaultCurrency,
  chainId: number,
  period: PeriodTab,
  yearlyApy: number,
  selectedToken: Token | null,
  tokenContract: Nullable<TokenContract>,
  setButtonMessage: (message: string | null) => void,
  setAmount: (amount: string) => void,
  withSwap: boolean,
): UseDepositCalculator => {
  const {
    fetchCalculate,
    isLoading: isLoadingCalculate,
    result,
  } = useZapInCalculate();

  const [selectedTokenPriceInUsd, setSelectedTokenPriceInUsd] =
    React.useState<number>(0);

  React.useEffect(() => {
    if (selectedToken)
      getTokenPriceUsd(selectedToken).then(setSelectedTokenPriceInUsd);
  }, [selectedToken]);

  const { triggerToast } = useToast();

  const { data } = useGetPriceApiV1MarketDataPriceGet(
    {
      token,
      chain_id: chainId,
    },
    { query: { enabled: Boolean(token) && Boolean(chainId) } },
  );

  const { address } = useWeb3ModalAccount();
  const { findToken } = useSwapTokens();

  const tokenPrice = Number(data?.data?.data?.price);

  const [availableFundsUsd, setAvailableFundsUsd] = React.useState<Money>(0);
  const [entryAmountUsd, setEntryAmountUsd] = React.useState<Money>(0);
  const [apy, setApy] = React.useState<number>(yearlyApy);
  const [text, setText] = React.useState<string>('yearly');
  const [profitTokens, setProfitTokens] = React.useState<Money>(0);
  const [profitUsd, setProfitUsd] = React.useState<Money>(0);
  const [balanceAfter, setBalanceAfter] = React.useState<Money>(0);
  const [balanceAfterText, setBalanceAfterText] =
    React.useState<string>('1 year');

  React.useEffect(() => {
    const fetchData = async () => {
      if (balance) {
        const availableFundsUsd = convertToUsd(Number(balance), tokenPrice);
        const entryAmountUsd = convertToUsd(
          Number(amountToDeposit),
          tokenPrice,
        );

        setAvailableFundsUsd(availableFundsUsd);
        setEntryAmountUsd(entryAmountUsd);
      }
    };

    if (!selectedToken) fetchData();

    if (selectedToken) {
      const availableFundsUsd = convertToUsd(
        Number(balance),
        selectedTokenPriceInUsd,
      );
      const entryAmountUsd = convertToUsd(
        Number(amountToDeposit),
        selectedTokenPriceInUsd,
      );

      setAvailableFundsUsd(availableFundsUsd);
      setEntryAmountUsd(entryAmountUsd);
    }
  }, [
    amountToDeposit,
    balance,
    tokenPrice,
    selectedTokenPriceInUsd,
    selectedToken,
  ]);

  const clearValues = () => {
    setButtonMessage(null);
    setAmount('0');
    setProfitTokens(0);
    setProfitUsd(0);
    setBalanceAfter(0);
  };

  const getProfit = React.useCallback(
    async (apy: number) => {
      try {
        if (Number(amountToDeposit) <= 0) {
          if (result) clearValues();
          return;
        }

        let profitTokens = Number(amountToDeposit) * (apy / 100);
        let balanceAfter = Number(amountToDeposit) + profitTokens;

        if (withSwap && selectedToken) {
          if (!address) {
            throw new Error('Wallet not connected');
          }

          const tokenOut = findToken(tokenContract?.address || '', chainId);

          if (!tokenOut) {
            throw new Error('Token not found');
          }

          setButtonMessage('Finding best rates...');

          const result = await fetchCalculate({
            fromChain: selectedToken.chainId,
            toChain: tokenOut.chainId,
            fromToken: selectedToken.address
              ? selectedToken.address
              : zeroAddress,
            toToken: tokenOut.address,
            fromAmount: utils
              .parseUnits(amountToDeposit, selectedToken.decimals)
              .toString(),
            fromAddress: address,
            fee: 0.05,
          });

          if (!result) {
            throw new Error('Something went wrong');
          }

          setButtonMessage(null);

          const receive = utils.formatUnits(
            result.estimate.toAmount,
            tokenOut.decimals,
          );
          profitTokens = Number(receive) * (apy / 100);
          balanceAfter = Number(receive) + profitTokens;
        }

        const profitUsd = convertToUsd(profitTokens, tokenPrice);

        setBalanceAfter(balanceAfter);
        setProfitUsd(profitUsd);
        setProfitTokens(profitTokens);
      } catch (error) {
        clearValues();

        const description = getLiFiErrorMessage(error);

        triggerToast({
          message: `Something went wrong`,
          description,
          type: ToastType.Error,
        });
      }
    },
    [amountToDeposit, tokenPrice, selectedToken, withSwap],
  );

  const getYearly = React.useCallback(() => {
    getProfit(yearlyApy);
    setApy(yearlyApy);
    setText('yearly');
    setBalanceAfterText('1 year');
  }, [getProfit, yearlyApy]);

  const getQuarterly = React.useCallback(() => {
    const apy = yearlyApy / 4;
    getProfit(apy);
    setApy(apy);
    setText('quarterly');
    setBalanceAfterText('3 months');
  }, [getProfit, yearlyApy]);

  const getMonthly = React.useCallback(() => {
    const apy = yearlyApy / 12;
    getProfit(apy);
    setApy(apy);
    setText('monthly');
    setBalanceAfterText('1 month');
  }, [getProfit, yearlyApy]);

  React.useEffect(() => {
    switch (period) {
      case PeriodTab.Year:
        getYearly();
        break;
      case PeriodTab.Quarter:
        getQuarterly();
        break;
      case PeriodTab.Month:
        getMonthly();
        break;
    }
  }, [getMonthly, getQuarterly, getYearly, period, yearlyApy]);

  return {
    availableFundsUsd,
    entryAmountUsd,
    apy: Number(apy.toFixed(2)),
    text,
    profitTokens,
    profitUsd,
    balanceAfter,
    balanceAfterText,
    isLoadingCalculate,
    swapCalculate: result,
    selectedTokenPriceInUsd,
  };
};
