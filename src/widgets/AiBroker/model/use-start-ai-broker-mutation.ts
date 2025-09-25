import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';
import type { AxiosError, AxiosRequestConfig } from 'axios';

import {
  AssessmentData,
  getGetSuggestedFundsApiV1AiBrokerPostMutationOptions,
  getSuggestedFundsApiV1AiBrokerPost,
  HTTPValidationError,
} from '@/shared/types';

export const useStartAiBrokerMutation = <
  TError = AxiosError<HTTPValidationError>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof getSuggestedFundsApiV1AiBrokerPost>>,
    TError,
    { data: AssessmentData },
    TContext
  >;
  axios?: AxiosRequestConfig;
}): UseMutationResult<
  Awaited<ReturnType<typeof getSuggestedFundsApiV1AiBrokerPost>>,
  TError,
  { data: AssessmentData },
  TContext
> => {
  const mutationOptions =
    getGetSuggestedFundsApiV1AiBrokerPostMutationOptions(options);

  return useMutation(mutationOptions);
};
