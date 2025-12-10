import React from 'react';

import { endOfDay } from 'date-fns';
import { useDebounceValue } from 'usehooks-ts';

import { QueryKey } from '@/shared/lib';
import { useTable } from '@/shared/lib';
import {
  HistoryActionEnum,
  SortHistory,
  useGetDashboardHistoryApiV1DashboardAddressHistoryGet,
} from '@/shared/types';

import { createTableColumns } from '../ui/columns';

interface UseTransactionsProps {
  walletAddress: string;
  vaultName?: string;
}

export const useTransactions = ({
  walletAddress,
  vaultName,
}: UseTransactionsProps) => {
  const tableColumns = React.useMemo(
    () => createTableColumns(Boolean(vaultName)),
    [vaultName],
  );

  const to = Math.floor(endOfDay(new Date()).getTime() / 1000);

  const tableProps = useTable({
    name: 'transactions',
    columns: tableColumns,
    defaultSort: {
      column: 'transaction_ts',
      direction: 'descending',
    },
  });

  const sortBy = tableProps.sortProps.sortDescriptor.column;
  const sortIsAscending =
    tableProps.sortProps.sortDescriptor.direction !== 'descending';
  const filterAction =
    tableProps.filters.action === 'all'
      ? undefined
      : (Array.from(
          tableProps.filters.action,
        )[0] as unknown as HistoryActionEnum);

  const [searchFundName] = useDebounceValue(
    tableProps.searches.fund_name || undefined,
    500,
  );
  const [searchTxId] = useDebounceValue(
    tableProps.searches.transaction_hash || undefined,
    500,
  );

  const { data, isFetching, isPending, isLoading } =
    useGetDashboardHistoryApiV1DashboardAddressHistoryGet(
      walletAddress,
      {
        since: 0,
        to,
        offset: tableProps.offset,
        limit: tableProps.limit,
        ascending: sortIsAscending,
        sort_by: sortBy as SortHistory,
        fund_name: vaultName ?? searchFundName,
        transaction_hash: searchTxId,
        action: filterAction,
      },
      {
        query: {
          queryKey: [
            QueryKey.DashboardHistory,
            walletAddress,
            to,
            tableProps.offset,
            tableProps.limit,
            sortBy,
            sortIsAscending,
            searchFundName,
            searchTxId,
            filterAction,
            vaultName,
          ],
          enabled: Boolean(walletAddress),
          placeholderData: (previousData) => previousData,
          refetchInterval: 10000,
        },
      },
    );

  const transactions = data?.data?.data ?? [];
  const totalPages = data?.data?.page_count ?? 0;
  const total = data?.data?.total_count ?? 0;

  const searchColumns = tableColumns.filter((column) => column.searchable);
  return {
    transactions,
    isLoading,
    isFetching: isFetching || isPending,
    totalPages,
    tableProps,
    total,
    searchColumns,
  };
};
