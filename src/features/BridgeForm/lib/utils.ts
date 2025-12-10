import { getChainById } from '@lifi/data-types';

import { BridgeSelectedChain } from '@/features/BridgeForm';
import { links } from '@/shared/lib';
import { StakingTokensData } from '@/shared/types';

export const chainFormatBridgeSelectedChain = ([
  chainId,
  { endpointId, oftAdapterContractAddress, cybroAddress },
]: [string, StakingTokensData]): BridgeSelectedChain => {
  const chain = getChainById(Number(chainId));

  return {
    isCrypto: true,
    name: chain.name,
    id: chain.id,
    logoUrl: chain.logoURI ?? links.noImage,
    endpointId,
    oftAdapterContractAddress: oftAdapterContractAddress ?? '',
    tokenAddress: cybroAddress,
  };
};
