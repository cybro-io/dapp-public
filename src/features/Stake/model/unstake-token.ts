import { providers } from 'ethers';

import { web3Modal } from '@/app/providers';
import { createStakeContract } from '@/shared/lib';

interface UnstakeToken {
  stakeAddress: string;
}

export const unstakeToken = async ({ stakeAddress }: UnstakeToken) => {
  const walletProvider = web3Modal.getWalletProvider();

  if (!walletProvider) {
    throw new Error('Wallet provider not found');
  }

  const signer = new providers.Web3Provider(walletProvider).getSigner();

  const stakeContract = createStakeContract(stakeAddress, signer);

  const unstakeTx = await stakeContract['withdraw()']();
  await unstakeTx.wait();
};
