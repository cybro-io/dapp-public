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
  const depositTx = await vaultContract.redeem(amount, walletAddress, {
    gasLimit: 1950000,
  });
  await depositTx.wait();

  return depositTx;
};
