import { SwapExactInResult } from 'symbiosis-js-sdk';

export const prepareCalculateParams = (exactIn: SwapExactInResult) => {
  const records: Record<string, { title: string; value: string }> = {};

  if (exactIn.fee || exactIn.extraFee) {
    const fee = exactIn.fee;
    const extraFee = exactIn.extraFee;
    let value = '';
    if (fee) {
      value = `${fee.toSignificant()}% ${fee.token.symbol}`;
    }

    if (extraFee) {
      value += `+ ${extraFee.toFixed()}% ${extraFee.token.symbol}`;
    }

    records.fee = {
      title: 'Estimated fee',
      value,
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
