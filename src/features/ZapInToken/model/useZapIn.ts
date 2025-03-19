'use client';

import { executeRoute, RouteExtended } from '@lifi/sdk';
import { Route } from '@lifi/types';
import { createEffect } from 'effector';
import { useUnit } from 'effector-react';
import { utils } from 'ethers';

const getLiFiAmountReceived = (route: RouteExtended) => {
  if (route.steps.length < 1) {
    return '0';
  }

  const execution = route.steps.at(-1)?.execution;
  if (!execution) {
    return '0';
  }

  const amount = execution.toAmount;
  const decimals = execution.toToken?.decimals;
  if (typeof amount === 'undefined' || typeof decimals === 'undefined') {
    return '0';
  }

  return utils.formatUnits(amount, decimals);
};

export const executeZapInFx = createEffect<Route, string>(async (route) => {
  const result = await executeRoute(route, {
    updateRouteHook(route) {
      console.log('updateRoute', route);
    },
  });

  return getLiFiAmountReceived(result);
});

export const useZapIn = () => {
  return useUnit({
    executeZapIn: executeZapInFx,
    isLoading: executeZapInFx.pending,
  });
};
