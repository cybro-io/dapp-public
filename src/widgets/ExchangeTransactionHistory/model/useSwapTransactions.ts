import React from 'react';

import { useQuery } from '@tanstack/react-query';
import axios, { AxiosResponse } from 'axios';

import { useWeb3ModalAccount } from '@/shared/lib';
import { SymbiosisTransaction } from '@/shared/types';

export const useSwapTransactions = () => {
  const [page, setPage] = React.useState(1);

  const { address } = useWeb3ModalAccount();

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
    queryFn: () =>
      axios.get(
        `https://api-v2.symbiosis.finance/explorer/v1/transactions/${address}`,
      ) as unknown as AxiosResponse<SymbiosisTransaction[]>,
  });

  const total = Math.ceil((data?.data.length ?? 0) / params.limit);
  const transactions = data?.data.slice(offset, offset + limit);

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
