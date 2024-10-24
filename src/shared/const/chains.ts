export enum Chain {
  BlastTest = 168587773,
  BlastMain = 81457,
}

export const NATIVE_TOKENS = ['0x0000000000000000000000000000000000000000'];

export const ChainToExplorerUrl: Record<string, string> = {
  [Chain.BlastMain]: 'https://blastscan.io',
  [Chain.BlastTest]: 'https://testnet.blastscan.io',
};
