import { AxiosResponse } from 'axios';
import { createEffect, createStore, sample } from 'effector';
import { useUnit } from 'effector-react';

import { getCurrenciesApiV1MunzenCurrenciesGet } from '@/shared/types';

import { MunzenCurrency } from './types';

const $munzenCurrencies = createStore<MunzenCurrency[] | null>(null);

const fetchMunzenCurrenciesFx = createEffect<void, MunzenCurrency[], null>(
  async () => {
    return (
      (await getCurrenciesApiV1MunzenCurrenciesGet()) as AxiosResponse<{
        result: MunzenCurrency[];
      }>
    ).data.result;
  },
);

sample({
  clock: fetchMunzenCurrenciesFx.doneData,
  target: $munzenCurrencies,
});

export const useMunzenCurrencies = () => {
  return useUnit({
    currencies: $munzenCurrencies,
    isLoading: fetchMunzenCurrenciesFx.pending,
    fetchCurrencies: fetchMunzenCurrenciesFx,
  });
};

fetchMunzenCurrenciesFx();
