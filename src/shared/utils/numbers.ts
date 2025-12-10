import { BigNumber } from 'bignumber.js';
import numeral from 'numeral';

export const shortNumber = (input?: unknown) => numeral(input).format('0.00a');

export const formatNumber = (
  value: number | string | undefined | null,
  options: Intl.NumberFormatOptions & { decimals?: number } = {},
) => {
  if (!value) {
    return '';
  }

  const valueBN = new BigNumber(value);
  if (valueBN.isNaN()) {
    return '';
  }

  const optionsClone = { ...options };

  optionsClone.maximumFractionDigits = optionsClone.maximumFractionDigits ?? 6;
  optionsClone.minimumFractionDigits = optionsClone.minimumFractionDigits ?? 0;
  optionsClone.useGrouping = optionsClone.useGrouping ?? true;
  optionsClone.decimals = optionsClone.decimals ?? 0;

  if (optionsClone.decimals > 0) {
    valueBN.div(10 ** optionsClone.decimals);
  }

  return new Intl.NumberFormat('en-US', optionsClone).format(
    valueBN.toNumber(),
  );
};
