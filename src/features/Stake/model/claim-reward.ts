import { providers } from 'ethers';

import { web3Modal } from '@/app/providers';
import { createStakeContract } from '@/shared/lib';

interface ClaimRewardProps {
  stakeAddress: string;
}

export const claimReward = async ({ stakeAddress }: ClaimRewardProps) => {
  const walletProvider = web3Modal.getWalletProvider();

  if (!walletProvider) {
    throw new Error('Wallet provider not found');
  }

  const signer = new providers.Web3Provider(walletProvider).getSigner();

  const stakeContract = createStakeContract(stakeAddress, signer);

  const claimTx = await stakeContract.claim();
  await claimTx.wait();
};
