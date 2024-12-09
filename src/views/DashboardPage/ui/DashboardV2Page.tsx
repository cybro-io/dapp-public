'use client';
import React, { useState } from 'react';

import { Skeleton } from '@nextui-org/react';
import { Tab, Tabs } from '@nextui-org/tabs';
import { BigNumber } from 'bignumber.js';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import { ChainId } from 'symbiosis-js-sdk';

import { BaseLayout } from '@/app/layouts';
import ApyIcon from '@/entities/ApyInfo/assets/icons/apy.svg';
import { BalanceChart } from '@/entities/BalanceChart/ui';
import { QueryKey } from '@/shared/const';
import { useToast } from '@/shared/lib';
import { useWeb3ModalAccount } from '@/shared/lib';
import {
  ComponentWithProps,
  Nullable,
  useGetDashboardHistoryApiV1DashboardAddressHistoryGet,
  useGetDashboardStatsApiV1DashboardAddressStatsGet,
} from '@/shared/types';
import { Group, Stack, Title, Typography } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';
import { PeriodTab, periodTabs } from '@/widgets/BalanceHistory';
import styles from '@/widgets/BalanceHistory/ui/BalanceHistory.module.scss';
import {
  getPeriodRange,
  groupTransactions,
} from '@/widgets/BalanceHistory/utils';
import DepositIcon from '@/widgets/DashboardInfo/assets/icons/deposit.svg';
import YieldIcon from '@/widgets/DashboardInfo/assets/icons/yield.svg';
import { MyVaults } from '@/widgets/MyVaults';
import { PageHeader } from '@/widgets/PageHeader';
import { Transactions } from '@/widgets/Transactions';

type DashboardPageProps = {};

const DashboardV2Page: ComponentWithProps<DashboardPageProps> = () => {
  const { isConnected, status, address } = useWeb3ModalAccount();
  const { triggerToast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    if (status !== 'reconnecting' && !isConnected) {
      triggerToast({
        message: 'Wallet is not connected',
        description: 'You need to connect your wallet to use the Dashboard',
      });
      router.push('/');
    }
  }, [isConnected, router, triggerToast, status]);

  const [period, setPeriod] = useState<PeriodTab>(PeriodTab.All);
  const { since, to } = getPeriodRange(period);

  const { data, isLoading } =
    useGetDashboardHistoryApiV1DashboardAddressHistoryGet(
      address!,
      {
        chain_id: ChainId.BLAST_MAINNET,
        since,
        to,
      },
      {
        query: {
          enabled: Boolean(address),
          queryKey: [QueryKey.DashboardHistory, address, to, since],
        },
      },
    );

  const historyData = data?.data?.data;
  const chartTransactions = React.useMemo(
    () => groupTransactions(historyData || [], period).reverse(),
    [historyData, period],
  );

  const onTabChange = React.useCallback((period: PeriodTab) => {
    setPeriod(period);
  }, []);

  const { data: statsData, isLoading: isDataLoading } =
    useGetDashboardStatsApiV1DashboardAddressStatsGet(
      address!,
      {
        timeframe: 'All',
      },
      {
        query: {
          queryKey: [QueryKey.DashboardStats, period, address],
          enabled: Boolean(address),
        },
      },
    );

  const stats = statsData?.data?.data;
  const isLoadingStats = isDataLoading || !statsData;

  if (!isConnected || !address) {
    return null;
  }

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeader.Title>Dashboard</PageHeader.Title>
      </PageHeader>
      <BaseLayout.Container className="pt-[15px] md:pt-[59px] flex flex-col gap-[46px]">
        <Group className="gap-6">
          <DashboardCard
            className="flex-1"
            icon={<DepositIcon />}
            title="Your Deposit"
            isLoading={isLoadingStats}
          >
            ${formatUserMoney(stats?.your_deposit)}
          </DashboardCard>
          <DashboardCard
            className="flex-1"
            icon={<YieldIcon />}
            title="Accrued yield"
            isLoading={isLoadingStats}
          >
            ${formatUserMoney(stats?.accrued_yield)}
          </DashboardCard>

          <ApyDashboardCard
            apy={stats?.apy}
            futureBalanceUsd={stats?.future_balance_usd}
            isLoading={isLoadingStats}
          />
        </Group>

        <MyVaults walletAddress={address} />

        <Stack className="gap-5">
          <Group className="justify-between">
            <Title order={3} uppercase>
              Balance Overview
            </Title>
            <Tabs
              items={periodTabs}
              selectedKey={period}
              onSelectionChange={(key) => onTabChange(key as PeriodTab)}
            >
              {({ key, title }) => (
                <Tab
                  className={clsx(
                    styles.tab,
                    key === period && styles.selected,
                  )}
                  key={key}
                  title={title}
                />
              )}
            </Tabs>
          </Group>
          <BalanceChart
            period={period}
            setPeriod={setPeriod}
            hoveredTransaction={null}
            setHoveredTransaction={() => {}}
            className={styles.balanceChart}
            data={chartTransactions}
            isLoading={isLoading}
          />
        </Stack>

        <Transactions walletAddress={address} />
      </BaseLayout.Container>
    </React.Fragment>
  );
};

export default DashboardV2Page;

const DashboardCard = ({
  className,
  title,
  icon,
  children,
  isLoading,
}: Pick<React.HTMLAttributes<HTMLDivElement>, 'className' | 'children'> & {
  title: string;
  icon: React.ReactElement;
  isLoading?: boolean;
}) => (
  <Group
    className={clsx(
      'p-4 md:py-5 md:pl-5 md:pr-[39px] bg-background-tableRow gap-4 rounded-[20px]',
      className,
    )}
  >
    {React.cloneElement(icon, { className: 'size-12' })}
    <Stack className="gap-1.5">
      <Typography variant="caption" order={4} className="text-white/60">
        {title}
      </Typography>
      <Skeleton isLoaded={!isLoading} className="rounded-xl">
        <Title order={3}>{children}</Title>
      </Skeleton>
    </Stack>
  </Group>
);

interface ApyDashboardCardProps {
  apy: Nullable<string>;
  futureBalanceUsd: Nullable<string>;
  isLoading?: boolean;
}

const ApyDashboardCard = ({
  apy,
  futureBalanceUsd,
  isLoading,
}: ApyDashboardCardProps) => {
  const apyFormatted = React.useMemo(() => {
    let str = '';
    const notAvailable = 'n/a';

    if (apy) {
      const percent = new BigNumber(apy).toFixed(2);
      str = `${percent}%`;
    } else {
      str = notAvailable;
    }

    if (futureBalanceUsd) {
      const usd = `$${formatUserMoney(futureBalanceUsd)}`;
      str += ` • ${usd}`;
    }

    return str;
  }, [apy, futureBalanceUsd]);

  return (
    <DashboardCard
      className="grow"
      icon={<ApyIcon />}
      title="APY"
      isLoading={isLoading}
    >
      {apyFormatted}
    </DashboardCard>
  );
};
