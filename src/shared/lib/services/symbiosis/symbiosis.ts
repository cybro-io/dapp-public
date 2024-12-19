import { createStore } from 'effector';
import { useUnit } from 'effector-react';
import { Symbiosis } from 'symbiosis-js-sdk';

export const TYPE_SYMBIOSIS = 'mainnet'; //process.env.NEXT_PUBLIC_TYPE as ConfigName;
const clientId = 'cybro-dapp';

export const $symbiosis = createStore<Symbiosis>(
  new Symbiosis(TYPE_SYMBIOSIS, clientId),
);

export const useSymbiosis = () => {
  return useUnit($symbiosis);
};
