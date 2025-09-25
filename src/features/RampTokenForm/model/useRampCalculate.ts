import React from 'react';

import { BigNumber } from 'bignumber.js';

import { MunzenFee, useMunzenRates } from '@/entities/Munzen';

export const useRampCalculate = () => {
  const { rates } = useMunzenRates();

  const [rampFee, setRampFee] = React.useState<number | null>(null);
  const [amountFromByUsd, setAmountFromByUsd] = React.useState<number | null>(
    null,
  );

  const [priceUsd, setPriceUsd] = React.useState<number>(0);
  const [amountToByUsd, setAmountToByUsd] = React.useState<number | null>(null);

  const [receiveAmount, setReceiveAmount] = React.useState<number | null>(null);

  const handleCalculate = ({
    amount,
    toCurrency,
    fromCurrency,
    fee,
  }: {
    fromCurrency: string;
    toCurrency: string;
    amount: string;
    fee?: MunzenFee | null;
  }) => {
    try {
      const usdRate = rates?.find(
        (rate) => rate.fromCurrency === 'USD' && rate.toCurrency === toCurrency,
      );

      if (!usdRate) {
        throw new Error('USD rate not found');
      }

      const rate = rates?.find(
        (rate) =>
          rate.fromCurrency === fromCurrency && rate.toCurrency === toCurrency,
      );

      if (!rate) {
        throw new Error('Rate not found');
      }

      const usdPrice = BigNumber(rate.exchangeRate.multiplier)
        .div(usdRate.exchangeRate.multiplier)
        .toString();

      setPriceUsd(Number(usdPrice));

      const amountBN = new BigNumber(amount);

      if (
        amountBN.isNaN() ||
        amountBN.isGreaterThan(rate.maxAmount) ||
        amountBN.isLessThan(rate.minAmount)
      ) {
        throw new Error('Amount out of range');
      }

      let feeAmount = 0;

      const arrayFee = fee?.providerFee.value
        .flatMap((item) => item)
        .find((item) => item.type === 'percent');

      if (arrayFee) {
        feeAmount = amountBN
          .dividedBy(100)
          .multipliedBy(arrayFee.value)
          .toNumber();
        setRampFee(feeAmount);
      }

      const receiveBN = amountBN
        .minus(feeAmount)
        .multipliedBy(rate.exchangeRate.multiplier)
        .dp(rate.roundOff);

      setAmountFromByUsd(
        BigNumber(usdPrice).multipliedBy(amountBN).dp(2).toNumber(),
      );
      setAmountToByUsd(
        BigNumber(usdRate.exchangeRate.divisor)
          .multipliedBy(receiveBN)
          .dp(2)
          .toNumber(),
      );

      setReceiveAmount(receiveBN.toNumber());

      return {
        amount: receiveBN.toNumber(),
        error: null,
      };
    } catch (error) {
      console.log(error);

      setReceiveAmount(null);
      setRampFee(null);
      setAmountFromByUsd(null);
      setAmountToByUsd(null);

      return {
        amount: 0,
        error: new Error((error as Error)?.message),
      };
    }
  };

  return {
    handleCalculate,
    rampFee,
    amountFromByUsd,
    amountToByUsd,
    receiveAmount,
    priceUsd,
  };
};
