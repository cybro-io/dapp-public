import { MaxUint256 } from '@ethersproject/constants';
import BigNumberJs from 'bignumber.js';
import { BigNumber, BigNumberish, utils } from 'ethers';

import {
  getSignatureApiV1StakingSignatureAddressGet,
  Token,
  VaultVersion_2025_02,
} from '@/shared/types';
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
  const {
    data: {
      data: { deadline, signature, staked_amount },
    },
  } = await getSignatureApiV1StakingSignatureAddressGet(walletAddress);
  const signatureHex = utils.hexValue(`0x${signature}`);

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

  // const sharePriceWei = await vaultContract.sharePrice();
  // const sharePrice = utils.formatEther(sharePriceWei);
  //
  // const minShares = new BigNumberJs(sharePrice)
  //   .multipliedBy(utils.formatEther(amount))
  //   .toFixed(18);
  //
  // const minSharesWei = increaseGasLimit(utils.parseEther(minShares), 0.95);

  const minSharesWei = '0';
  // todo return when used fees
  const params = {
    amount: amount.toString(),
    address: walletAddress,
    minShares: minSharesWei.toString(),
    stakedAmount: staked_amount.toString(),
    deadline: deadline.toString(),
    signature: signatureHex,
  };

  const estimateGas = await vaultContract.estimateGas.updateFeeDiscountDeposit(
    params.amount,
    params.address,
    params.minShares,
    params.stakedAmount,
    params.deadline,
    params.signature,
  );

  const gasLimit = increaseGasLimit(estimateGas, 1.35);

  const depositTx = await vaultContract.updateFeeDiscountDeposit(
    params.amount,
    params.address,
    params.minShares,
    params.stakedAmount,
    params.deadline,
    params.signature,
    {
      gasLimit,
    },
  );

  // const params = {
  //   assets: amount.toString(),
  //   receiver: walletAddress,
  //   minShares: minSharesWei.toString(),
  // };
  //
  // const estimateGas = await vaultContract.estimateGas.deposit(
  //   params.assets,
  //   params.receiver,
  //   params.minShares,
  // );
  //
  // const gasLimit = increaseGasLimit(estimateGas, 1.35);
  //
  // const depositTx = await vaultContract.deposit(
  //   params.assets,
  //   params.receiver,
  //   params.minShares,
  //   { gasLimit },
  // );
  //
  await depositTx.wait();

  return depositTx;
};
