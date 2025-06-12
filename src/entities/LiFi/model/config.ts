'use client';

import { createConfig, EVM } from '@lifi/sdk';

const integrator = 'cybro';

export const evmProvider = EVM();
createConfig({
  integrator,
  providers: [evmProvider],
});
