import { createStore } from 'effector';
import { useUnit } from 'effector-react';
import { isBtcChainId, isTronChainId } from 'symbiosis-js-sdk';

import { $symbiosis } from '@/shared/lib';

export const $swapChains = createStore(
  $symbiosis
    .getState()
    .chains()
    .filter(
      (chain) =>
        chain.swappable &&
        chain.evm &&
        !isTronChainId(chain.id) &&
        !isBtcChainId(chain.id),
    ),
);

export const useSwapChains = () => {
  return useUnit($swapChains);
};
