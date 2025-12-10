import { BigNumberish } from 'ethers';

import { Vault } from '@/shared/types';
import { increaseGasLimit } from '@/shared/utils';

interface IWithdrawErc4626VaultProps {
  vaultContract: Vault;
  walletAddress: string;
  tokenAddress: string;
  amount: BigNumberish;
}

export const withdrawErc4626Vault = async ({
  vaultContract,
  walletAddress,
  amount,
}: IWithdrawErc4626VaultProps) => {
  const estimateGas = await vaultContract.estimateGas.redeem(
    amount.toString(),
    walletAddress,
    walletAddress,
  );

  const gasLimit = increaseGasLimit(estimateGas, 1.35);

  const depositTx = await vaultContract.redeem(
    amount,
    walletAddress,
    walletAddress,
    { gasLimit },
  );
  await depositTx.wait();

  return depositTx;
};
