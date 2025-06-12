import { ErrorCode } from 'symbiosis-js-sdk';

import { statusError } from '@/entities/SwapToken';

export const getSwapExactError = (error: unknown) => {
  const normalizedError = error as Error & { code?: ErrorCode };

  if (normalizedError.code && normalizedError.code in statusError) {
    return statusError[normalizedError.code];
  }

  if (normalizedError.message) {
    return normalizedError.message;
  }

  return 'Unknown Error';
};
