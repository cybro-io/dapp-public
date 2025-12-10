import React from 'react';

import { ExchangeTransactionRow } from '@/entities/ExchangeTransaction';
import { useMunzenCurrencies } from '@/entities/Munzen';
import { Pagination, Text, TextView } from '@/shared/ui';

import { useRampTransactions } from '../model/useRampTransactions';

import { ExchangeTransactionHistoryLoader } from './ExchangeTransactionHistoryLoader';

export const RampTransactionHistory = () => {
  const {
    transactions,
    pagination,
    isLoading: isLoadingTransactions,
    isTransactionsNoResult,
  } = useRampTransactions();

  const { currencies, isLoading: isLoadingCurrencies } = useMunzenCurrencies();

  const isLoading = isLoadingTransactions || isLoadingCurrencies;

  return (
    <React.Fragment>
      <div className="grid">
        {!isLoading && isTransactionsNoResult && (
          <Text textView={TextView.H4} className="!my-60 text-center">
            No transactions found
          </Text>
        )}
        {isLoading && <ExchangeTransactionHistoryLoader />}
        {!isLoading &&
          transactions?.map((transaction, index) => (
            <ExchangeTransactionRow
              key={transaction.id}
              from={{
                name: transaction.from_currency?.ticker ?? 'Undefined',
                amount: transaction.from_amount ?? 0,
                icon:
                  currencies?.find(
                    (currency) =>
                      currency.tickerWithNetwork ===
                      transaction.from_currency?.ticker,
                  )?.logoUrl ?? '',
                directionName: 'You paid',
              }}
              to={{
                name: transaction.to_currency?.ticker ?? 'Undefined',
                amount: transaction.to_amount ?? 0,
                icon:
                  currencies?.find(
                    (currency) =>
                      currency.tickerWithNetwork ===
                      transaction.to_currency?.ticker,
                  )?.logoUrl ?? '',
                directionName: 'You received',
              }}
              createdAtTimestamp={transaction.created}
              isContained={index % 2 === 0}
            />
          ))}
      </div>
      {!isTransactionsNoResult && (
        <Pagination {...pagination} showControls boundaries={2} />
      )}
    </React.Fragment>
  );
};
