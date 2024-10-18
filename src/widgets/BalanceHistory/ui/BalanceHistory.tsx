'use client';

import React, { useState, useEffect } from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';
import clsx from 'clsx';
import { ChainId } from 'symbiosis-js-sdk';

import { BalanceChart } from '@/entities/BalanceChart/ui';
import { TransactionHistory } from '@/entities/TransactionHistory';
import { HistoryViewType } from '@/entities/TransactionHistory/const';
import { QueryKey } from '@/shared/const';
import { useWeb3ModalAccount } from '@/shared/lib';
import {
  ComponentWithProps,
  useGetDashboardHistoryApiV1DashboardAddressHistoryGet,
} from '@/shared/types';
import { Text, TextView } from '@/shared/ui';
import {
  getPeriodRange,
  groupTransactions,
} from '@/widgets/BalanceHistory/utils';

import { PeriodTab, periodTabs } from '../const';

import styles from './BalanceHistory.module.scss';

type BalanceHistoryProps = {};

export const BalanceHistory: ComponentWithProps<BalanceHistoryProps> = ({
  className,
}) => {
  const { address: userAddress } = useWeb3ModalAccount();
  const [period, setPeriod] = useState<PeriodTab>(PeriodTab.All);
  const [width, setWidth] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hoveredTransaction, setHoveredTransaction] = useState<string | null>(
    null,
  );
  const [localStorageAddress, setLocalStorageAddress] = useState<string | null>(
    null,
  ); // State to store address

  const { since, to } = getPeriodRange(period);

  // Fetch the address from localStorage
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedAddress = localStorage.getItem('address');
      setLocalStorageAddress(storedAddress);
    }
  }, []);

  const { data, isLoading } =
    useGetDashboardHistoryApiV1DashboardAddressHistoryGet(
      localStorageAddress || userAddress || '',
      {
        chain_id: ChainId.BLAST_MAINNET,
        since,
        to,
      },
      {
        query: {
          queryKey: [
            QueryKey.DashboardHistory,
            localStorageAddress,
            userAddress,
            since,
            to,
          ],
        },
      },
    );

  const historyData = data?.data?.data;

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    if (typeof window !== 'undefined') {
      setWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const chartTransactions = React.useMemo(
    () => groupTransactions(historyData || [], period).reverse(),
    [historyData, period],
  );

  const onTabChange = React.useCallback((period: PeriodTab) => {
    setPeriod(period);
    setCurrentPage(1);
  }, []);

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.container}>
        <div className={styles.balanceOverview}>
          <Text
            className={clsx(styles.title, styles.balanceTitle)}
            textView={TextView.H3}
          >
            Balance overview
          </Text>
          <Tabs
            items={periodTabs}
            selectedKey={period}
            onSelectionChange={(key) => onTabChange(key as PeriodTab)}
            classNames={{
              base: clsx(styles.historyTabs, styles.historyTabsMobile),
              tabList: styles.tabList,
              tabContent: clsx(
                styles.tabContent,
                'group-data-[selected=true]:text-[#000000]',
              ),
              panel: styles.panel,
            }}
          >
            {({ key, title }) => (
              <Tab
                className={clsx(styles.tab, key === period && styles.selected)}
                key={key}
                title={title}
              />
            )}
          </Tabs>
          <BalanceChart
            period={period}
            setPeriod={setPeriod}
            hoveredTransaction={hoveredTransaction}
            setHoveredTransaction={setHoveredTransaction}
            className={styles.balanceChart}
            data={chartTransactions}
            isLoading={isLoading}
          />
        </div>
        <div className={styles.history}>
          <Text
            className={clsx(styles.title, styles.historyTitle)}
            textView={TextView.H3}
          >
            History
          </Text>
          <Tabs
            items={periodTabs}
            selectedKey={period}
            onSelectionChange={(key) => onTabChange(key as PeriodTab)}
            classNames={{
              base: clsx(styles.historyTabs, styles.historyTabsDesktop),
              tabList: styles.tabList,
              tabContent: clsx(
                styles.tabContent,
                'group-data-[selected=true]:text-[#000000]',
              ),
              panel: styles.panel,
            }}
          >
            {({ key, title }) => (
              <Tab
                className={clsx(styles.tab, key === period && styles.selected)}
                key={key}
                title={title}
              />
            )}
          </Tabs>
          <TransactionHistory
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            chainId={ChainId.BLAST_MAINNET}
            hoveredTransaction={hoveredTransaction}
            setHoveredTransaction={setHoveredTransaction}
            data={historyData || []}
            className={styles.transactionHistory}
            viewType={
              width >= 1100
                ? HistoryViewType.Infinite
                : HistoryViewType.Pagination
            }
            isLoading={isLoading}
          />
        </div>
      </div>
    </div>
  );
};
