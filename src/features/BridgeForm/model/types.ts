import { SelectedChain } from '@/features/SelectToken';

export interface BridgeSelectedChain extends SelectedChain {
  endpointId: number;
  oftAdapterContractAddress: string;
  tokenAddress: string;
}

export enum BridgeStep {
  approveOnSourceChain = 0,
  sendTxOnSourcheChain,
  waitLayerZero,
}
