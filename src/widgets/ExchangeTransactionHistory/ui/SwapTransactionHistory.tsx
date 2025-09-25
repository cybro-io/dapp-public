import React from 'react';

import { getChainById } from '@lifi/data-types';
import { ExtendedTransactionInfo } from '@lifi/sdk';
import { utils } from 'ethers';

import { ExchangeTransactionRow } from '@/entities/ExchangeTransaction';
import { Pagination, Text, TextView } from '@/shared/ui';

import { useSwapTransactions } from '../model/useSwapTransactions';

import { ExchangeTransactionHistoryLoader } from './ExchangeTransactionHistoryLoader';

export const SwapTransactionHistory = () => {
  const { transactions, pagination, isLoading, isTransactionsNoResult } =
    useSwapTransactions();

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
          transactions?.map(
            (
              {
                sending,
                receiving: receivingData,
                transactionId,
                lifiExplorerLink,
              },
              index,
            ) => {
              const sendingChain = getChainById(sending.chainId);
              const receivingChain = getChainById(receivingData.chainId);
              const receiving = receivingData as ExtendedTransactionInfo;

              const createdAtTimestamp = (sending.timestamp ?? 0) * 1000;

              return (
                <ExchangeTransactionRow
                  key={transactionId}
                  from={{
                    name: `${sending.token?.symbol} ${sendingChain.name}`,
                    amount: utils.formatUnits(
                      BigInt(sending.amount ?? 0),
                      sending.token?.decimals ?? 0,
                    ),
                    icon: String(sending.token?.logoURI),
                    chainIcon: String(sendingChain.logoURI),
                    directionName: 'You paid',
                  }}
                  to={{
                    name: `${receiving.token?.symbol} ${receivingChain.name}`,
                    amount: utils.formatUnits(
                      BigInt(receiving.amount ?? 0),
                      receiving.token?.decimals ?? 0,
                    ),
                    icon: String(receiving.token?.logoURI),
                    chainIcon: String(receivingChain.logoURI),
                    directionName: 'You received',
                  }}
                  link={lifiExplorerLink}
                  createdAtTimestamp={createdAtTimestamp}
                  isContained={index % 2 === 0}
                />
              );
            },
          )}
      </div>
      {!isTransactionsNoResult && (
        <Pagination {...pagination} showControls boundaries={2} />
      )}
    </React.Fragment>
  );
};
