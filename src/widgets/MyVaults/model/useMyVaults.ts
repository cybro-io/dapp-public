import React, { useState } from 'react';

import dayjs from 'dayjs';

import { QueryKey } from '@/shared/const';
import { useTable } from '@/shared/lib';
import { useFundsInvestmentsApiV1DashboardInvestmentsGet } from '@/shared/types';
import { PeriodTab } from '@/widgets/BalanceHistory';
import { getPeriodRange } from '@/widgets/BalanceHistory/utils';

import { createTableColumns } from '../ui/columns';

interface UseTransactionsProps {
  walletAddress: string;
}

export const useMyVaults = ({ walletAddress }: UseTransactionsProps) => {
  const [period, setPeriod] = useState<PeriodTab>(PeriodTab.All);
  const { since, to } = getPeriodRange(period);

  const tableColumns = React.useMemo(
    () => createTableColumns(period),
    [period],
  );

  const fromDate = dayjs(since * 1000).format('YYYY-MM-DD');
  const toDate = dayjs(to * 1000).format('YYYY-MM-DD');

  const tableProps = useTable({
    columns: tableColumns,
  });

  const { data, isFetching, isPending, isLoading } =
    useFundsInvestmentsApiV1DashboardInvestmentsGet(
      {
        address: walletAddress,
        currency: 'USD',
        offset: tableProps.offset,
        limit: tableProps.limit,
        from_date: fromDate,
        to_date: toDate,
      },
      {
        query: {
          enabled: Boolean(walletAddress),
          queryKey: [
            QueryKey.MyVaults,
            walletAddress,
            tableProps.offset,
            tableProps.limit,
            toDate,
            fromDate,
          ],
          placeholderData: (previousData) => previousData,
        },
      },
    );

  const vaults = data?.data?.data ?? [];
  const totalPages = data?.data?.page_count ?? 0;
  const total = data?.data?.total_count ?? 0;

  return {
    vaults,
    isLoading,
    isFetching: isFetching || isPending,
    totalPages,
    tableProps,
    total,
    period,
    setPeriod,
  };
};
