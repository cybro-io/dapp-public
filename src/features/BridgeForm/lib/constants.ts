import { getChainById } from '@lifi/data-types';
import { ChainId, Chain } from '@lifi/sdk';

import { BridgeSelectedChain } from '@/features/BridgeForm';
import { links } from '@/shared/lib';

const chainFormatBridgeSelectedChain = ({
  chain,
  endpointId,
  oftAdapterContractAddress,
  tokenAddress,
}: {
  chain: Chain;
  endpointId: number;
  oftAdapterContractAddress: string;
  tokenAddress: string;
}): BridgeSelectedChain => ({
  isCrypto: true,
  name: chain.name,
  id: chain.id,
  logoUrl: chain.logoURI ?? links.noImage,
  endpointId,
  oftAdapterContractAddress,
  tokenAddress,
});

export const bridgeChains = [
  // {
  //   chain: getChainById(ChainId.ETH),
  //   endpointId: 30101,
  //   oftAdapterContractAddress: '0xD58826d2C0bAbf1A60d8b508160b52E9C19AFf07',
  //   tokenAddress: '0xD58826d2C0bAbf1A60d8b508160b52E9C19AFf07',
  // },
  {
    chain: getChainById(ChainId.BLS),
    endpointId: 30243,
    oftAdapterContractAddress: '0x7Bb6cAC7e47E8149C4Ef62b759Ee8b2E56C0304F',
    tokenAddress: '0x963eec23618BbC8e1766661d5f263f18094Ae4d5',
  },
  {
    chain: getChainById(ChainId.BSC),
    endpointId: 30102,
    oftAdapterContractAddress: '0xA9972b1fAC35fdd8cBdbaA315A002B2Ad91d2ad6',
    tokenAddress: '0xA9972b1fAC35fdd8cBdbaA315A002B2Ad91d2ad6',
  },
].map(chainFormatBridgeSelectedChain);
