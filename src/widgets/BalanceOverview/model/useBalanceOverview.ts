import { useState } from 'react';

import { capitalize } from '@heroui/shared-utils';

import { QueryKey } from '@/shared/lib';
import { useAppKitAccount } from '@/shared/lib';
import {
  GetBalanceApiV1DashboardAddressBalanceGetTimeframe,
  useGetBalanceApiV1DashboardAddressBalanceGet,
} from '@/shared/types';

import { BalanceOverviewPeriod } from './types';

export const useBalanceOverview = () => {
  const [period, setPeriod] = useState<BalanceOverviewPeriod>(
    BalanceOverviewPeriod.Week,
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

  const balanceData = data?.data?.balance_data ?? [];

  return { balanceData, isLoading, period, setPeriod };
};
