import { BigNumberish } from 'ethers';

import { VaultDex } from '@/shared/types';
import { increaseGasLimit } from '@/shared/utils';

interface IWithdrawDexVault {
  vaultContract: VaultDex;
  tokenAddress: string;
  walletAddress: string;
  amount: BigNumberish;
}

export const withdrawDexVault = async ({
  vaultContract,
  tokenAddress,
  walletAddress,
  amount,
}: IWithdrawDexVault) => {
  // Check if token is token0
  const token0Address = await vaultContract.token0();
  const isToken0 = token0Address === tokenAddress;

  const estimateGas = await vaultContract.estimateGas.redeem(
    isToken0,
    amount.toString(),
    walletAddress,
    walletAddress,
    0,
  );

  const gasLimit = increaseGasLimit(estimateGas, 1.35);

  const withdrawTx = await vaultContract.redeem(
    isToken0,
    amount.toString(),
    walletAddress,
    walletAddress,
    0,
    { gasLimit },
  );
  await withdrawTx.wait();

  return withdrawTx;
};
