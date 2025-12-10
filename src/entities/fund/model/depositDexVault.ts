import { MaxUint256 } from '@ethersproject/constants';
import { BigNumber, BigNumberish } from 'ethers';

import { Token, VaultDex } from '@/shared/types';
import { increaseGasLimit } from '@/shared/utils';

interface IDepositDexVaultProps {
  vaultContract: VaultDex;
  tokenContract: Token;
  walletAddress: string;
  amount: BigNumberish;
  onStartApprove?: () => void;
  onStartDeposit?: () => void;
}

export const depositDexVault = async ({
  vaultContract,
  tokenContract,
  walletAddress,
  amount,
  onStartApprove,
  onStartDeposit,
}: IDepositDexVaultProps) => {
  const tokenAddress = tokenContract.address;
  const vaultAddress = vaultContract.address;

  // Check if token is token0
  const token0Address = await vaultContract.token0();
  const inToken0 = token0Address === tokenAddress;

  // Get sqrt price
  const sqrtPrice = (await vaultContract.getCurrentSqrtPrice()).toString();
  const sqrtPriceBN = BigNumber.from(sqrtPrice);

  const minSqrt = sqrtPriceBN.mul(95).div(100).toString();
  const maxSqrt = sqrtPriceBN.mul(105).div(100).toString();

  const allowance = (await tokenContract.allowance(
    walletAddress,
    vaultAddress,
  )) as BigNumber;

  if (allowance.lt(amount)) {
    onStartApprove?.();
    const approveTx = await tokenContract.approve(vaultAddress, MaxUint256);
    await approveTx.wait();
  }

  const estimateGas = await vaultContract.estimateGas.deposit({
    inToken0,
    amount,
    receiver: walletAddress,
    minSqrtPriceX96: minSqrt,
    maxSqrtPriceX96: maxSqrt,
  });

  const gasLimit = increaseGasLimit(estimateGas, 1.35);

  onStartDeposit?.();
  const depositTx = await vaultContract.deposit(
    {
      inToken0,
      amount,
      receiver: walletAddress,
      minSqrtPriceX96: minSqrt,
      maxSqrtPriceX96: maxSqrt,
    },
    { gasLimit },
  );
  await depositTx.wait();

  return depositTx;
};
