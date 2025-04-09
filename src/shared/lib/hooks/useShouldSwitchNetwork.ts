import { ChainId } from '@lifi/sdk';
import { useSwitchNetwork } from '@web3modal/ethers5/react';

import { useWeb3ModalAccount } from '@/shared/lib';

export const useShouldSwitchNetwork = (shouldChainId: ChainId) => {
  const { switchNetwork: switchNetworkVendor } = useSwitchNetwork();
  const { chainId } = useWeb3ModalAccount();
  const isNeedSwitchNetwork = chainId !== shouldChainId;

  const switchNetwork = () => switchNetworkVendor(shouldChainId);

  return { isNeedSwitchNetwork, switchNetwork };
};
