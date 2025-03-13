import { providers } from 'ethers';

import { createLockedTokenContract } from '@/shared/lib';

import { web3Modal } from '../../../app/providers';

interface ClaimLockedTokenProps {
  lockedTokenAddress: string;
}

export const claimLockedToken = async ({
  lockedTokenAddress,
}: ClaimLockedTokenProps) => {
  const walletProvider = web3Modal.getWalletProvider();

  if (!walletProvider) {
    throw new Error('Wallet provider not found');
  }

  const signer = new providers.Web3Provider(walletProvider).getSigner();

  const lockedTokenContract = createLockedTokenContract(
    lockedTokenAddress,
    signer,
  );

  const claimTx = await lockedTokenContract.claim();
  await claimTx.wait();
};
