import { BigNumber, ethers, providers } from 'ethers';

import { createStakeContract, createTokenContract } from '@/shared/lib';
import { increaseGasLimit } from '@/shared/utils';

import { appKit } from '../../../app/providers';

export interface StakeTokenProps {
  amount: string;
  tokenAddress: string;
  stakeAddress: string;
  walletAddress: string;
}

export const stakeToken = async ({
  tokenAddress,
  stakeAddress,
  walletAddress,
  amount,
}: StakeTokenProps) => {
  const walletProvider = appKit.getWalletProvider();

  if (!walletProvider) {
    throw new Error('Wallet provider not found');
  }

  const weiAmount = ethers.utils.parseUnits(amount);

  const signer = new providers.Web3Provider(walletProvider).getSigner();

  const tokenContract = createTokenContract(tokenAddress, signer);
  const stakeContract = createStakeContract(stakeAddress, signer);

  const allowance = (await tokenContract.allowance(
    walletAddress,
    stakeAddress,
  )) as BigNumber;

  if (allowance.lt(weiAmount)) {
    const approveTx = await tokenContract.approve(stakeAddress, weiAmount);
    await approveTx.wait();
  }

  const estimateGas = await stakeContract.estimateGas.stake(
    weiAmount.toString(),
  );
  const gasLimit = increaseGasLimit(estimateGas, 1.35);

  const stakeTx = await stakeContract.stake(weiAmount.toString(), { gasLimit });
  await stakeTx.wait();
};
