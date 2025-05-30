import { AxiosResponse } from 'axios';
import { createEffect, createStore, sample } from 'effector';
import { useUnit } from 'effector-react';

import { MunzenRate } from '@/entities/Munzen';
import { getRatesApiV1MunzenCurrenciesRatesGet } from '@/shared/types';

const $munzenRates = createStore<MunzenRate[] | null>(null);

const fetchMunzenRatesFx = createEffect<void, MunzenRate[] | null, null>(
  async () => {
    return Object.values(
      (
        (await getRatesApiV1MunzenCurrenciesRatesGet()) as AxiosResponse<{
          result: Record<string, MunzenRate>;
        }>
      ).data.result,
    );
  },
);

sample({
  clock: fetchMunzenRatesFx.doneData,
  target: $munzenRates,
});

export const useMunzenRates = () => {
  return useUnit({
    rates: $munzenRates,
    isLoading: fetchMunzenRatesFx.pending,
    fetchRates: fetchMunzenRatesFx,
  });
};

fetchMunzenRatesFx();
