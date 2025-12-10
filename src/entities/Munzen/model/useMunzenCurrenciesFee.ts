import { AxiosResponse } from 'axios';

import { MunzenFee } from '@/entities/Munzen';
import { useGetFeesApiV1MunzenCurrenciesFeesInstrumentGet } from '@/shared/types';

export const useMunzenCurrenciesFee = (instrument: string) => {
  const { data, isLoading } = useGetFeesApiV1MunzenCurrenciesFeesInstrumentGet(
    instrument,
    {
      query: { queryKey: [instrument], enabled: Boolean(instrument) },
    },
  );

  const fee = (data as AxiosResponse<{ result: MunzenFee | null }> | undefined)
    ?.data.result;

  return { fee, isLoading };
};
