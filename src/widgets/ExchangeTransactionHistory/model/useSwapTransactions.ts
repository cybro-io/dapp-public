import React from 'react';

import { FullStatusData, getTransactionHistory } from '@lifi/sdk';
import { useQuery } from '@tanstack/react-query';

import { useAppKitAccount } from '@/shared/lib';

export const useSwapTransactions = () => {
  const [page, setPage] = React.useState(1);

  const { address } = useAppKitAccount();

  const limit = 6;
  const offset = (page - 1) * limit;

  const params = {
    limit,
    offset,
    type: 'all',
  };

  const { data, isLoading } = useQuery({
    queryKey: ['transactionsList', address],
    enabled: Boolean(address),
    refetchInterval: 5000,
    queryFn: async () => {
      const response = await getTransactionHistory({
        wallet: address!,
        status: 'DONE',
      });

      return response.transfers as FullStatusData[];
    },
  });

  const total = Math.ceil((data?.length ?? 0) / params.limit);
  const transactions = data?.slice(offset, offset + limit);

  const isTransactionsNoResult = transactions?.length === 0;

  const pagination = {
    total,
    page,
    onChange: setPage,
  };

  return {
    isLoading,
    isTransactionsNoResult,
    transactions,
    pagination,
  };
};
