import { useState } from 'react';

import { capitalize } from '@heroui/shared-utils';

import { QueryKey } from '@/shared/lib';
import { useAppKitAccount } from '@/shared/lib';
import {
  GetBalanceApiV1DashboardAddressBalanceGetTimeframe,
  useGetBalanceApiV1DashboardAddressBalanceGet,
} from '@/shared/types';

import { ProfitOverviewPeriod } from './types';

export const useProfitOverview = () => {
  const [period, setPeriod] = useState<ProfitOverviewPeriod>(
    ProfitOverviewPeriod.Week,
  );

  const { address } = useAppKitAccount();

  const { data, isLoading } = useGetBalanceApiV1DashboardAddressBalanceGet(
    address!,
    {
      timeframe: capitalize(
        period,
      ) as GetBalanceApiV1DashboardAddressBalanceGetTimeframe,
    },
    {
      query: {
        enabled: Boolean(address),
        queryKey: [QueryKey.DashboardHistory, address, period],
      },
    },
  );

  const profitData = data?.data?.profit_data ?? [];

  return { profitData, isLoading, period, setPeriod };
};
