'use client';

import React, { Dispatch, SetStateAction } from 'react';

import { Skeleton } from '@heroui/react';
import clsx from 'clsx';

import { HistoryViewType } from '@/entities/TransactionHistory/const';
import { ComponentWithProps, DashboardHistoryData } from '@/shared/types';
import { IconButton, Text } from '@/shared/ui';
import { isEven } from '@/shared/utils';

import ArrowIcon from '../assets/icons/pagination-arrow.svg';

import { TransactionHistoryItem } from './components';
import styles from './TransactionHistory.module.scss';

type TransactionHistoryProps = {
  chainId: number;
  data: DashboardHistoryData[];
  hoveredTransaction: string | null;
  setHoveredTransaction: (tx: string | null) => void;
  viewType?: HistoryViewType;
  currentPage?: number;
  setCurrentPage?: Dispatch<SetStateAction<number>>;
  itemsPerPage?: number;
  isLoading?: boolean;
};

const skeletons = [1, 2, 3, 4, 5];

export const TransactionHistory: ComponentWithProps<
  TransactionHistoryProps
> = ({
  data,
  chainId,
  currentPage,
  setCurrentPage,
  hoveredTransaction,
  setHoveredTransaction,
  viewType = HistoryViewType.Pagination,
  itemsPerPage = 10,
  isLoading = false,
  className,
}) => {
  const indexOfLastItem = currentPage && currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem && indexOfLastItem - itemsPerPage;
  const currentTransactions = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <div className={clsx(styles.root, className)}>
      <ul className={clsx(styles.transactionList, styles[viewType])}>
        {isLoading
          ? skeletons.map((item) => (
              <Skeleton key={item} className="w-full h-16 rounded-lg mb-4" />
            ))
          : currentTransactions.map((tx, index) => (
              <TransactionHistoryItem
                transaction={tx}
                isDark={isEven(index + 1)}
                isHighlighted={hoveredTransaction === tx.transaction_hash}
                onHover={setHoveredTransaction}
                chainId={chainId}
                key={tx.transaction_hash}
              />
            ))}
      </ul>
      {!isLoading && !data.length && (
        <Text className={styles.emptyText}>No transactions</Text>
      )}
      {viewType === HistoryViewType.Pagination && isLoading && (
        <Skeleton className="w-full h-12 rounded-lg" />
      )}
      {viewType === HistoryViewType.Pagination &&
        setCurrentPage &&
        !isLoading && (
          <div className={styles.paginationContainer}>
            <IconButton
              className={clsx(styles.arrowButton, styles.left)}
              icon={<ArrowIcon />}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              disabled={currentPage === 1}
            />
            <span className={styles.pageInfo}>
              Page <span className={styles.pageNumber}>{currentPage}</span> of{' '}
              <span className={styles.pageNumber}>{totalPages || 1}</span>
            </span>
            <IconButton
              className={clsx(styles.arrowButton, styles.right)}
              icon={<ArrowIcon />}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              disabled={currentPage === totalPages || totalPages === 0}
            />
          </div>
        )}
    </div>
  );
};
