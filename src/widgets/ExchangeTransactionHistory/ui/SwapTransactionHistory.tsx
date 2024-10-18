import React from 'react';

import { utils } from 'ethers';

import { ExchangeTransactionRow } from '@/entities/ExchangeTransaction';
import { useSwapTokens } from '@/entities/SwapToken';
import { links } from '@/shared/lib';
import { Pagination, Text, TextView } from '@/shared/ui';

import { useSwapTransactions } from '../model/useSwapTransactions';

import { ExchangeTransactionHistoryLoader } from './ExchangeTransactionHistoryLoader';

const preparedTokenAddress = (address: string) =>
  address === '0x0000000000000000000000000000000000000000' ? '' : address;

export const SwapTransactionHistory = () => {
  const { transactions, pagination, isLoading, isTransactionsNoResult } =
    useSwapTransactions();

  const { findToken } = useSwapTokens();

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
          transactions?.map((transaction, index) => {
            const { from_route, to_route, created_at } = transaction;

            const tokenIn = from_route?.at(0);
            const tokenOut = to_route?.at(-1);

            if (!tokenIn || !tokenOut) {
              return null;
            }

            const findTokenIn = findToken(
              preparedTokenAddress(tokenIn.token.address),
              tokenIn.chain_id,
            );
            const findTokenOut = findToken(
              preparedTokenAddress(tokenOut.token.address),
              tokenOut.chain_id,
            );

            return (
              <ExchangeTransactionRow
                key={transaction.id}
                from={{
                  name: `${tokenIn.token.symbol} ${findTokenIn?.chain?.name}`,
                  amount: Number(
                    utils.formatUnits(
                      String(tokenIn.amount),
                      tokenIn.token.decimals,
                    ),
                  ),
                  icon: String(findTokenIn?.icons?.small),
                  chainIcon: String(findTokenIn?.chain?.icons?.small),
                  directionName: 'You pay',
                }}
                to={{
                  name: `${tokenOut.token.symbol} ${findTokenOut?.chain?.name}`,
                  amount: Number(
                    utils.formatUnits(
                      String(tokenOut.amount),
                      tokenOut.token.decimals,
                    ),
                  ),
                  icon: String(findTokenOut?.icons?.small),
                  chainIcon: String(findTokenOut?.chain?.icons?.small),
                  directionName: 'You receive',
                }}
                link={links.symbiosisExplorer
                  .replace('{chainId}', String(transaction.from_chain_id))
                  .replace('{txId}', transaction.hash)}
                createdAt={created_at}
                isContained={index % 2 === 0}
              />
            );
          })}
      </div>
      <Pagination {...pagination} showControls boundaries={2} />
    </React.Fragment>
  );
};
