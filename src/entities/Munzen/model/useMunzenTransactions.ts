import { useGetTransactionsApiV1MunzenAddressTransactionsGet } from '@/shared/types';

export const useMunzenTransactions = (address: string | null | undefined) => {
  const { data: transactions, isLoading } =
    useGetTransactionsApiV1MunzenAddressTransactionsGet(address!, {
      query: {
        enabled: Boolean(address),
        select: (data) => data.data.data,
      },
    });

  const isTransactionsNoResult = transactions?.length === 0;

  return { transactions, isLoading, isTransactionsNoResult };
};
