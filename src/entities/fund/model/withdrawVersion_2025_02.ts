import { BigNumberish } from 'ethers';

import { VaultVersion_2025_02 } from '@/shared/types';
import { increaseGasLimit } from '@/shared/utils';

interface IWithdrawVersion_2025_02VaultProps {
  vaultContract: VaultVersion_2025_02;
  walletAddress: string;
  tokenAddress: string;
  amount: BigNumberish;
  isEnabledTiers: boolean;
}

export const withdrawVersion_2025_02 = async ({
  vaultContract,
  walletAddress,
  amount,
}: IWithdrawVersion_2025_02VaultProps) => {
  const minAssetsWei = '0';
  const params = {
    shares: amount.toString(),
    receiver: walletAddress,
    owner: walletAddress,
    minAssets: minAssetsWei.toString(),
  };

  const estimateGas = await vaultContract.estimateGas.redeem(
    params.shares,
    params.receiver,
    params.owner,
    params.minAssets,
  );

  const gasLimit = increaseGasLimit(estimateGas, 1.35);

  const tx = await vaultContract.redeem(
    params.shares,
    params.receiver,
    params.owner,
    params.minAssets,
    {
      gasLimit,
    },
  );
  await tx.wait();

  return tx;
};
