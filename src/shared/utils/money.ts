import { BigNumberish, utils } from 'ethers';
import numeral from 'numeral';

import { Money, Nullable, UserMoney } from '@/shared/types';
import { isInvalidNumber } from '@/shared/utils/utils';

export const formatUserMoney = (
  value: Money | string | undefined,
  maxDecimals = 6,
  minDecimals = 0,
): UserMoney => {
  if (isInvalidNumber(value) || Number(value) === 0)
    return `0.${'0'.repeat(minDecimals || 2)}`;

  let numericValue: number;

  if (typeof value === 'string') {
    // Remove commas before parsing to ensure correct numeric value
    numericValue = parseFloat(value.replace(/,/g, ''));
  } else {
    numericValue = value;
  }

  if (isNaN(numericValue)) {
    return '0.00';
  }

  if (numericValue >= 1e6) {
    return numeral(Math.floor(numericValue / 1e6) * 1e6).format('0,0a');
  }

  if (numericValue === 0) {
    return '0';
  }

  // Adjust the value to be smaller than or equal to the initial value
  let adjustedValue = numericValue;
  const factor = Math.pow(10, maxDecimals);
  adjustedValue = Math.floor(adjustedValue * factor) / factor;

  // Format the number with up to maxDecimals decimal places
  let formattedValue = adjustedValue.toLocaleString('en', {
    minimumFractionDigits: minDecimals,
    maximumFractionDigits: maxDecimals,
  });

  // Remove trailing zeros after the decimal point, but not after commas
  if (formattedValue.includes('.') && minDecimals < 1) {
    formattedValue = formattedValue
      .replace(/(\.\d*?[1-9])0+$/, '$1')
      .replace(/\.$/, '');
  }

  return formattedValue;
};

export const fromWei = (
  value: Nullable<BigNumberish>,
  decimals = 18,
): Money => {
  if (typeof value === 'undefined' || value === null) return null;

  return Number(utils.formatUnits(value, decimals));
};

export const formatMoney = (value: number, decimals = 2): string => {
  const factor = Math.pow(10, decimals);
  return (Math.floor(value * factor) / factor).toFixed(decimals);
};

export const convertToUsd = (value: Money, tokenPrice: number): Money => {
  if (!value) return 0;

  return value * tokenPrice;
};
