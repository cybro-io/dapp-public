import { SwapExactInResult } from 'symbiosis-js-sdk';

export const prepareCalculateParams = (exactIn: SwapExactInResult) => {
  const records: Record<string, { title: string; value: string }> = {};

  if (exactIn.fees.length) {
    records.fee = {
      title: 'Estimated fee',
      value: exactIn.fees
        .map((fee) => `${fee.value.toSignificant()} ${fee.value.token.symbol}`)
        .join(', '),
    };
  }

  if (exactIn.priceImpact) {
    records.priceImpact = {
      title: 'Price impact',
      value: `${exactIn.priceImpact.toFixed()}%`,
    };
  }

  if (exactIn.tokenAmountOutMin) {
    records.tokenAmountOutMin = {
      title: 'Minimum received',
      value: `${exactIn.tokenAmountOutMin.toSignificant()} ${exactIn.tokenAmountOutMin.token.symbol}`,
    };
  }

  return records;
};
