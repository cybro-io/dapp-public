import { createStore } from 'effector';
import { useUnit } from 'effector-react';
import { isBtc, isTronChainId } from 'symbiosis-js-sdk';

import { $symbiosis } from '@/shared/lib';

export const $swapChains = createStore(
  $symbiosis
    .getState()
    .chains()
    .filter((chain) => !isTronChainId(chain.id) && !isBtc(chain.id)),
);

export const useSwapChains = () => {
  return useUnit($swapChains);
};
