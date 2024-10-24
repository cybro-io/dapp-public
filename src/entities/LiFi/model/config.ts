import { createConfig, EVM } from '@lifi/sdk';

const integrator = 'cybro';

export const evmProvider = EVM();
export const liFiInstance = createConfig({
  integrator,
  providers: [evmProvider],
});
