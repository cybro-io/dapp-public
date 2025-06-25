import { providers } from 'ethers';

import { createStakeContract } from '@/shared/lib';

import { appKit } from '../../../app/providers';

interface UnstakeToken {
  stakeAddress: string;
}

export const unstakeToken = async ({ stakeAddress }: UnstakeToken) => {
  const walletProvider = appKit.getWalletProvider();

  if (!walletProvider) {
    throw new Error('Wallet provider not found');
  }

  const signer = new providers.Web3Provider(walletProvider).getSigner();

  const stakeContract = createStakeContract(stakeAddress, signer);

  const unstakeTx = await stakeContract['withdraw()']();
  await unstakeTx.wait();
};
