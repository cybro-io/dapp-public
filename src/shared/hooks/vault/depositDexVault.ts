import { MaxUint256 } from '@ethersproject/constants';
import { BigNumber, BigNumberish, ethers } from 'ethers';

import TOKEN from '@/app/abi/token.json';
import vaultDexAbi from '@/app/abi/vaultDex.json';

interface IDepositDex {
  tokenAddress: string;
  vaultAddress: string;
  signer: ethers.providers.JsonRpcSigner;
  walletAddress: string;
  amount: BigNumberish;
  onStartApprove?: () => void;
  onStartDeposit?: () => void;
}

export const depositDexVault = async ({
  vaultAddress,
  tokenAddress,
  signer,
  walletAddress,
  amount,
  onStartApprove,
  onStartDeposit,
}: IDepositDex) => {
  const vaultDexContract = new ethers.Contract(
    vaultAddress,
    vaultDexAbi,
    signer,
  );
  const tokenContract = new ethers.Contract(tokenAddress, TOKEN, signer);

  // Check if token is token0
  const token0Address = await vaultDexContract.token0();
  const isToken0 = token0Address === tokenAddress;

  // Get sqrt price
  const sqrtPrice = (await vaultDexContract.getCurrentSqrtPrice()).toString();
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

  await vaultDexContract.estimateGas.deposit([
    isToken0,
    amount.toString(),
    walletAddress,
    minSqrt,
    maxSqrt,
  ]);

  onStartDeposit?.();
  const depositTx = await vaultDexContract.deposit([
    isToken0,
    amount.toString(),
    walletAddress,
    minSqrt,
    maxSqrt,
  ]);
  await depositTx.wait();

  return depositTx;
};
