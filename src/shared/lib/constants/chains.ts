import { AppKitNetwork } from '@reown/appkit-common';
import { providers } from 'ethers';
import { Chain, defineChain } from 'viem';
import {
  immutableZkEvm,
  gravity,
  taiko,
  fraxtal,
  rootstock,
  celo,
  mantle,
  arbitrum,
  blast,
  bsc as vendorBsc,
  mainnet as vendorMainnet,
  optimism,
  polygon,
  base as vendorBase,
  avalanche,
  scroll,
  linea,
  zksync,
  polygonZkEvm,
  gnosis,
  moonriver,
  moonbeam,
  fuse,
  boba,
  mode,
  metis,
  aurora,
  sei,
  arbitrumNova,
  bahamut,
  coreDao,
  cronos,
  cronoszkEVM,
  kava,
  manta,
  zkLinkNova,
  zetachain,
  telos,
  merlin,
  bsquared,
  blastSepolia,
} from 'viem/chains';

// boba bnb chain
export const bobaBnb = defineChain({
  id: 56288,
  name: 'Boba Bnb',
  nativeCurrency: {
    decimals: 18,
    name: 'BOBA',
    symbol: 'BOBA',
  },
  rpcUrls: {
    default: { http: ['https://bnb.boba.network'] },
  },
  blockExplorers: {
    default: {
      name: 'BOBAScan',
      url: 'https://bnb.bobascan.com',
    },
  },
  contracts: {},
});

const base = defineChain({
  ...vendorBase,
  rpcUrls: {
    default: { http: ['https://base-rpc.publicnode.com'] },
  },
});

const bsc = defineChain({
  ...vendorBsc,
  rpcUrls: {
    default: { http: ['https://bsc-dataseed.binance.org'] },
  },
});

export const mainnet = defineChain({
  ...vendorMainnet,
  rpcUrls: {
    default: { http: ['https://ethereum-rpc.publicnode.com'] },
  },
});

const blastRpc = process.env.NEXT_PUBLIC_BLAST_RPC as string;

export const testChains: AppKitNetwork[] = [blastSepolia];

const invalidSwapChains: readonly number[] = [
  arbitrumNova.id,
  bobaBnb.id,
  bahamut.id,
  coreDao.id,
  cronoszkEVM.id,
  kava.id,
  manta.id,
  zkLinkNova.id,
  zetachain.id,
  telos.id,
  merlin.id,
  bsquared.id,
  fraxtal.id,
];

export const chains: AppKitNetwork[] = [
  immutableZkEvm,
  gravity,
  taiko,
  fraxtal,
  rootstock,
  celo,
  mantle,
  arbitrum,
  arbitrumNova,
  blast,
  bsc,
  mainnet,
  optimism,
  polygon,
  base,
  avalanche,
  scroll,
  linea,
  zksync,
  polygonZkEvm,
  gnosis,
  moonriver,
  moonbeam,
  fuse,
  boba,
  bobaBnb,
  mode,
  metis,
  aurora,
  sei,
  bahamut,
  coreDao,
  cronos,
  cronoszkEVM,
  kava,
  manta,
  zkLinkNova,
  zetachain,
  telos,
  merlin,
  bsquared,
];

// chains for swap/zapIn
export const swapChains = chains.filter(
  (chain) => !invalidSwapChains.includes(Number(chain.id)),
);

export const getChain = (chainId: number) =>
  chains.find((chain) => (chain as Chain).id === chainId) as Chain;

export const getProviderByChainId = (id: number) => {
  const rpcUrl = getChain(id).rpcUrls.default.http[0];

  if (!rpcUrl) {
    return null;
  }

  return new providers.JsonRpcProvider(rpcUrl);
};

export const getExplorerProvider = (chainId: number) => {
  const chain = getChain(chainId);

  return chain?.blockExplorers?.default.url ?? null;
};
