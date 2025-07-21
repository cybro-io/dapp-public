'use client';

import { createConfig, EVM, RouteOptions } from '@lifi/sdk';

export const liFiIntegrator = 'cybro';
export const liFiDefaultRouteOptions: RouteOptions = {
  fee: 0.01,
  allowSwitchChain: true,
  order: 'CHEAPEST',
};

export const evmProvider = EVM();
createConfig({
  integrator: liFiIntegrator,
  providers: [evmProvider],
});
