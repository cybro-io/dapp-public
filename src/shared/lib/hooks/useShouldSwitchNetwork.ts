import { ChainId } from '@lifi/sdk';
import { useAppKitNetwork } from '@reown/appkit/react';

import { getChain } from '@/shared/lib';

export const useShouldSwitchNetwork = (shouldChainId: ChainId) => {
  const { switchNetwork: switchNetworkVendor, chainId } = useAppKitNetwork();
  const isNeedSwitchNetwork = chainId !== shouldChainId;

  const switchNetwork = () => switchNetworkVendor(getChain(shouldChainId));

  return { isNeedSwitchNetwork, switchNetwork };
};
