import { MaxUint256 } from '@ethersproject/constants';
import { BigNumber, BigNumberish } from 'ethers';

import { Token, Vault } from '@/shared/types';
import { increaseGasLimit } from '@/shared/utils';

interface IDepositErc4626VaultProps {
  vaultContract: Vault;
  tokenContract: Token;
  walletAddress: string;
  amount: BigNumberish;
  onStartApprove?: () => void;
  onStartDeposit?: () => void;
}

export const depositErc4626Vault = async ({
  vaultContract,
  tokenContract,
  walletAddress,
  amount,
  onStartApprove,
  onStartDeposit,
}: IDepositErc4626VaultProps) => {
  const vaultAddress = vaultContract.address;

  const allowance = (await tokenContract.allowance(
    walletAddress,
    vaultAddress,
  )) as BigNumber;

  if (allowance.lt(amount)) {
    onStartApprove?.();
    const approveTx = await tokenContract.approve(vaultAddress, MaxUint256);
    await approveTx.wait();
  }

  onStartDeposit?.();
  const estimateGas = await vaultContract.estimateGas.deposit(
    amount.toString(),
    walletAddress,
  );

  const gasLimit = increaseGasLimit(estimateGas, 1.35);

  const depositTx = await vaultContract.deposit(amount, walletAddress, {
    gasLimit,
  });
  await depositTx.wait();

  return depositTx;
};
