import { Token } from 'symbiosis-js-sdk';

export enum SwapStatus {
  APPROVE_TRANSACTION,
  SEND_TRANSACTION,
  MINED_TRANSACTION,
  COMPLETED_TRANSACTION,
}

export const getSwapStatus = (
  status: SwapStatus,
  tokenIn: Token,
  tokenOut: Token,
) => {
  const statuses: Record<SwapStatus, string> = {
    [SwapStatus.APPROVE_TRANSACTION]: 'Approving the transaction...',
    [SwapStatus.SEND_TRANSACTION]: `Sending the transaction to ${tokenIn.chain?.name}...`,
    [SwapStatus.MINED_TRANSACTION]:
      'Waiting for the transaction to be mined...',
    [SwapStatus.COMPLETED_TRANSACTION]: `Getting ${tokenOut.symbol} on ${tokenOut.chain?.name}...`,
  };

  return statuses[status];
};
