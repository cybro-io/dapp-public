'use client';

import { convertQuoteToRoute, executeRoute, LiFiStep } from '@lifi/sdk';
import { createEffect } from 'effector';
import { useUnit } from 'effector-react';

import { triggerToast } from '@/shared/hooks';
import { ToastType } from '@/shared/ui';

export const executeZapInFx = createEffect<LiFiStep, void, void>(
  async (quote) => {
    try {
      const route = convertQuoteToRoute(quote);

      const executedRoute = await executeRoute(route, {
        // Gets called once the route object gets new updates
        updateRouteHook(route) {
          console.log(route);
        },
      });
    } catch (error) {
      const errorMessage = error as { message?: string };

      triggerToast({
        message: 'Error',
        description: errorMessage?.message ?? 'Something went wrong',
        type: ToastType.Error,
      });
      console.error(error);
    }
  },
);

export const useZapIn = () => {
  return useUnit({
    executeZapIn: executeZapInFx,
    isLoading: executeZapInFx.pending,
  });
};
