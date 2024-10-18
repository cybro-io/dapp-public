import React from 'react';

import { BigNumber } from 'bignumber.js';

import { MunzenFee, useMunzenRates } from '@/entities/Munzen';

export const useRampCalculate = () => {
  const { rates } = useMunzenRates();

  const [rampFee, setRampFee] = React.useState<number | null>(null);
  const [amountFromByUsd, setAmountFromByUsd] = React.useState<number | null>(
    null,
  );
  const [amountToByUsd, setAmountToByUsd] = React.useState<number | null>(null);

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

      const amountBN = new BigNumber(amount);

      if (
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

      const usdPrice = BigNumber(rate.exchangeRate.multiplier)
        .div(usdRate.exchangeRate.multiplier)
        .toString();

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

      return receiveBN.toNumber();
    } catch (error) {
      console.log(error);

      setRampFee(null);
      setAmountFromByUsd(null);
      setAmountToByUsd(null);

      return 0;
    }
  };

  return { handleCalculate, rampFee, amountFromByUsd, amountToByUsd };
};
