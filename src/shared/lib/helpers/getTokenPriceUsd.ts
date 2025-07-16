import { BigNumberish } from 'ethers';

export const getTokenAmountUsd = (
  amount: BigNumberish,
  price: number,
): number => {
  return parseFloat((parseFloat(amount.toString()) * price).toFixed(2));
};
