import { BigNumberish } from 'ethers';

import { VaultOneClick } from '@/shared/types';
import { increaseGasLimit } from '@/shared/utils';

interface IWithdrawOneClickVaultProps {
  vaultContract: VaultOneClick;
  walletAddress: string;
  tokenAddress: string;
  amount: BigNumberish;
}

export const withdrawOneClickVault = async ({
  vaultContract,
  walletAddress,
  amount,
}: IWithdrawOneClickVaultProps) => {
  const estimateGas = await vaultContract.estimateGas.redeem(
    amount.toString(),
    walletAddress,
  );

  const gasLimit = increaseGasLimit(estimateGas, 1.35);

  const depositTx = await vaultContract.redeem(amount, walletAddress, {
    gasLimit,
  });
  await depositTx.wait();

  return depositTx;
};
