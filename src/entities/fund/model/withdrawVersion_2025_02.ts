import { BigNumber } from 'bignumber.js';
import { BigNumberish, utils } from 'ethers';

import { VaultVersion_2025_02 } from '@/shared/types';
import { increaseGasLimit } from '@/shared/utils';

interface IWithdrawVersion_2025_02VaultProps {
  vaultContract: VaultVersion_2025_02;
  walletAddress: string;
  tokenAddress: string;
  amount: BigNumberish;
}

export const withdrawVersion_2025_02 = async ({
  vaultContract,
  walletAddress,
  amount,
}: IWithdrawVersion_2025_02VaultProps) => {
  const sharePriceWei = await vaultContract.sharePrice();
  const sharePrice = utils.formatEther(sharePriceWei);

  const minAssets = new BigNumber(utils.formatEther(amount))
    .div(sharePrice)
    .toFixed(18);

  const minAssetsWei = increaseGasLimit(utils.parseEther(minAssets), 0.95);

  const estimateGas = await vaultContract.estimateGas.redeem(
    amount.toString(),
    walletAddress,
    walletAddress,
    minAssetsWei.toString(), // minAssets
  );

  const gasLimit = increaseGasLimit(estimateGas, 1.35);

  const depositTx = await vaultContract.redeem(
    amount,
    walletAddress,
    walletAddress,
    minAssetsWei,
    { gasLimit },
  );
  await depositTx.wait();

  return depositTx;
};
