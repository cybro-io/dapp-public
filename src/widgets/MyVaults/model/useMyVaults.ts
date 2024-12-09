import { QueryKey } from '@/shared/const';
import { useTable } from '@/shared/lib';
import { useFundsInvestmentsApiV1DashboardInvestmentsGet } from '@/shared/types';

import { tableColumns } from '../ui/columns';

interface UseTransactionsProps {
  walletAddress: string;
}

export const useMyVaults = ({ walletAddress }: UseTransactionsProps) => {
  const tableProps = useTable({
    columns: tableColumns,
  });

  const { data, isFetching, isPending, isLoading } =
    useFundsInvestmentsApiV1DashboardInvestmentsGet(
      {
        address: walletAddress,
        currency: 'USD',
      },
      {
        query: {
          enabled: Boolean(walletAddress),
          queryKey: [QueryKey.MyVaults, walletAddress],
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
  };
};
