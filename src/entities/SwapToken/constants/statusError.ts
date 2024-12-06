import { ErrorCode } from 'symbiosis-js-sdk';

export const statusError: Record<ErrorCode, string> = {
  [ErrorCode.DEFAULT]: 'Unknown error',
  [ErrorCode.NO_REPRESENTATION_FOUND]: 'No representation found',
  [ErrorCode.AMOUNT_LESS_THAN_FEE]: 'Amount less than fee',
  [ErrorCode.NO_TRANSIT_TOKEN]: 'No transit token found',
  [ErrorCode.MIN_THORCHAIN_AMOUNT_IN]: 'Min thorchain amount in',
  [ErrorCode.ADVISOR_ERROR]: 'Advisor error',
  [ErrorCode.AMOUNT_TOO_HIGH]: 'Amount too high',
  [ErrorCode.AMOUNT_TOO_LOW]: 'Amount too low',
  [ErrorCode.MIN_TON_AMOUNT_IN]: 'Min ton amount in',
  [ErrorCode.THORCHAIN_NOT_SUPPORTED_ADDRESS]:
    'Thorchain not supported address',
};
