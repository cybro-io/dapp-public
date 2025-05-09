import React from 'react';

import { useMunzenTransactions } from '@/entities/Munzen';
import { useAppKitAccount } from '@/shared/lib';

export const useRampTransactions = () => {
  const [page, setPage] = React.useState(1);

  const { address } = useAppKitAccount();

  const limit = 6;
  const offset = (page - 1) * limit;

  const params = {
    limit,
    offset,
    type: 'all',
  };

  const {
    transactions: data,
    isLoading,
    isTransactionsNoResult,
  } = useMunzenTransactions(address);

  const total = Math.ceil((data?.length ?? 0) / params.limit);
  const transactions = data?.slice(offset, offset + limit);

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
