'use client';

import { getQuote, QuoteRequest, LiFiStep } from '@lifi/sdk';
import { createEffect, createStore, sample } from 'effector';
import { useUnit } from 'effector-react';

import { executeZapInFx } from './useZapIn';

const zapInCalculate$ = createStore<LiFiStep | null>(null);

const getZapInCalculateFx = createEffect<QuoteRequest, LiFiStep>(getQuote);

sample({
  clock: getZapInCalculateFx.doneData,
  target: zapInCalculate$,
});

zapInCalculate$.reset([executeZapInFx.finally, getZapInCalculateFx.failData]);

export const useZapInCalculate = () =>
  useUnit({
    result: zapInCalculate$,
    fetchCalculate: getZapInCalculateFx,
    isLoading: getZapInCalculateFx.pending,
  });

export const getLiFiErrorMessage = (error: unknown) => {
  const liFiError = error as {
    cause?: {
      responseBody?: {
        message?: string;
      };
    };
  };

  const message = liFiError?.cause?.responseBody?.message;

  return (
    message ??
    'We were unable to complete the current operation. Try again or connect feedback.'
  );
};
