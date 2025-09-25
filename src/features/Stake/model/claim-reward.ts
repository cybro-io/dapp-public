import { providers } from 'ethers';

import { createStakeContract } from '@/shared/lib';

import { appKit } from '../../../app/providers';

interface ClaimRewardProps {
  stakeAddress: string;
}

export const claimReward = async ({ stakeAddress }: ClaimRewardProps) => {
  const walletProvider = appKit.getWalletProvider();

  if (!walletProvider) {
    throw new Error('Wallet provider not found');
  }

  const signer = new providers.Web3Provider(walletProvider).getSigner();

  const stakeContract = createStakeContract(stakeAddress, signer);

  const claimTx = await stakeContract.claim();
  await claimTx.wait();
};
