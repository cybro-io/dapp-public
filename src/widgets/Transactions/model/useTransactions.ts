import { endOfDay } from 'date-fns';
import { ChainId } from 'symbiosis-js-sdk';

import { QueryKey } from '@/shared/const';
import { useTable } from '@/shared/lib';
import {
  HistoryActionEnum,
  SortHistory,
  useGetDashboardHistoryApiV1DashboardAddressHistoryGet,
} from '@/shared/types';

import { tableColumns } from '../ui/columns';

interface UseTransactionsProps {
  walletAddress: string;
}

export const useTransactions = ({ walletAddress }: UseTransactionsProps) => {
  const to = Math.floor(endOfDay(new Date()).getTime() / 1000);

  const tableProps = useTable({
    columns: tableColumns,
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

  const searchFundName = tableProps.searches.fund_name || undefined;
  const searchTxId = tableProps.searches.transaction_hash || undefined;

  const { data, isFetching, isPending, isLoading } =
    useGetDashboardHistoryApiV1DashboardAddressHistoryGet(
      walletAddress,
      {
        chain_id: ChainId.BLAST_MAINNET,
        since: 0,
        to,
        offset: tableProps.offset,
        limit: tableProps.limit,
        ascending: sortIsAscending,
        sort_by: sortBy as SortHistory,
        fund_name: searchFundName,
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
          ],
          enabled: Boolean(walletAddress),
          placeholderData: (previousData) => previousData,
        },
      },
    );

  const transactions = data?.data?.data ?? [];
  const totalPages = data?.data?.page_count ?? 0;
  const total = data?.data?.total_count ?? 0;

  return {
    transactions,
    isLoading,
    isFetching: isFetching || isPending,
    totalPages,
    tableProps,
    total,
  };
};
