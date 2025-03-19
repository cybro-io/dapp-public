import { MaxUint256 } from '@ethersproject/constants';
import BigNumberJs from 'bignumber.js';
import { BigNumber, BigNumberish, utils } from 'ethers';

import { Token, VaultVersion_2025_02 } from '@/shared/types';
import { increaseGasLimit } from '@/shared/utils';

interface IDepositVersion_2025_02VaultProps {
  vaultContract: VaultVersion_2025_02;
  tokenContract: Token;
  walletAddress: string;
  amount: BigNumberish;
  onStartApprove?: () => void;
  onStartDeposit?: () => void;
}

export const depositVersion_2025_02Vault = async ({
  vaultContract,
  tokenContract,
  walletAddress,
  amount,
  onStartApprove,
  onStartDeposit,
}: IDepositVersion_2025_02VaultProps) => {
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

  const sharePriceWei = await vaultContract.sharePrice();
  const sharePrice = utils.formatEther(sharePriceWei);

  const minShares = new BigNumberJs(sharePrice)
    .multipliedBy(utils.formatEther(amount))
    .toFixed(18);

  const minSharesWei = increaseGasLimit(utils.parseEther(minShares), 0.95);

  const estimateGas = await vaultContract.estimateGas.deposit(
    amount.toString(),
    walletAddress,
    minSharesWei.toString(), // minShares
  );

  const gasLimit = increaseGasLimit(estimateGas, 1.35);

  const depositTx = await vaultContract.deposit(
    amount,
    walletAddress,
    minSharesWei,
    {
      gasLimit,
    },
  );
  await depositTx.wait();

  return depositTx;
};
