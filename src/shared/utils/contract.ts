import { BigNumber } from 'ethers';

export const increaseGasLimit = (
  estimatedGasLimit: BigNumber,
  increasePercentage: number,
): bigint => {
  try {
    return (
      (estimatedGasLimit.toBigInt() *
        BigInt(Math.ceil(increasePercentage * 100))) /
      BigInt(100)
    );
  } catch (error) {
    console.error('Error estimating gas limit:', error);
    throw error;
  }
};
