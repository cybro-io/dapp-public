import { MaxUint256 } from '@ethersproject/constants';
import { BigNumber, BigNumberish, ethers } from 'ethers';

import TOKEN from '@/app/abi/token.json';
import vaultDexAbi from '@/app/abi/vaultDex.json';

interface IWithdrawDexVault {
  tokenAddress: string;
  vaultAddress: string;
  signer: ethers.providers.JsonRpcSigner;
  walletAddress: string;
  amount: BigNumberish;
  onStartApprove?: () => void;
  onStartWithdraw?: () => void;
}

export const withdrawDexVault = async ({
  vaultAddress,
  tokenAddress,
  signer,
  walletAddress,
  amount,
  onStartApprove,
  onStartWithdraw,
}: IWithdrawDexVault) => {
  const vaultDexContract = new ethers.Contract(
    vaultAddress,
    vaultDexAbi,
    signer,
  );
  const tokenContract = new ethers.Contract(tokenAddress, TOKEN, signer);

  // Check if token is token0
  const token0Address = await vaultDexContract.token0();
  const isToken0 = token0Address === tokenAddress;

  const allowance = (await tokenContract.allowance(
    walletAddress,
    vaultAddress,
  )) as BigNumber;

  if (allowance.lt(amount)) {
    const approveTx = await tokenContract.approve(vaultAddress, MaxUint256);
    onStartApprove?.();
    await approveTx.wait();
  }

  await vaultDexContract.estimateGas.redeem(
    isToken0,
    amount.toString(),
    walletAddress,
    walletAddress,
    0,
  );

  const withdrawTx = await vaultDexContract.redeem(
    isToken0,
    amount.toString(),
    walletAddress,
    walletAddress,
    0,
  );

  onStartWithdraw?.();
  await withdrawTx.wait();

  return withdrawTx;
};
