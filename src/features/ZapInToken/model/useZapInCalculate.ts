'use client';

import {
  getRoutes,
  RoutesRequest,
  getGasRecommendation,
  Route,
} from '@lifi/sdk';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { useUnit } from 'effector-react';

import { getProviderByChainId } from '@/shared/lib';

const zapInCalculate$ = createStore<Route | null>(null);

const getZapInCalculateFx = createEffect<RoutesRequest, Route | null, Error>(
  async (request) => {
    const gasRecommendationResponse = await getGasRecommendation({
      chainId: request.toChainId,
      fromChain: request.fromChainId,
      fromToken: request.fromTokenAddress,
    });

    const provider = getProviderByChainId(request.fromChainId);
    if (!provider) {
      throw new Error('Provider not found');
    }

    if (!request.fromAddress) {
      throw new Error('From address is missing');
    }

    const balance = await provider.getBalance(request.fromAddress);

    if (
      !gasRecommendationResponse.available &&
      balance.lt(gasRecommendationResponse.fromAmount ?? 0)
    ) {
      throw new Error(
        'Gas funding is not available and you do not have enough gas in your wallet',
      );
    }

    const result = await getRoutes({
      ...request,
      fromAmountForGas: gasRecommendationResponse.fromAmount,
    });

    if (result.routes.length < 1) {
      throw new Error(
        'No routes found. Reasons for that could be: low liquidity, amount selected is too low, gas costs are too high or there are no routes for the selected combination.',
      );
    }

    const routesWithoutSymbiosis = result.routes.filter(
      (route) => !route.steps.some((step) => step.tool === 'symbiosis'),
    );

    if (routesWithoutSymbiosis.length) {
      return routesWithoutSymbiosis[0];
    }

    return result.routes[0];
  },
);

sample({
  clock: getZapInCalculateFx.doneData,
  target: zapInCalculate$,
});

const resetCalculate = createEvent();

zapInCalculate$.reset([resetCalculate, getZapInCalculateFx.failData]);

export const useZapInCalculate = () =>
  useUnit({
    result: zapInCalculate$,
    resetCalculate,
    fetchCalculate: getZapInCalculateFx,
    isLoading: getZapInCalculateFx.pending,
  });

export const getLiFiErrorMessage = (error: unknown) => {
  const liFiError = error as {
    message?: string;
    cause?: {
      responseBody?: {
        message?: string;
      };
    };
  };

  const message =
    liFiError?.cause?.responseBody?.message ||
    liFiError?.message ||
    'We were unable to complete the current operation. Try again or connect feedback.';

  return message;
};
