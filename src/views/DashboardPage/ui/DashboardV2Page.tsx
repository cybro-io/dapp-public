'use client';
import React from 'react';

import { Skeleton } from '@heroui/react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { QueryKey, useToast, useAppKitAccount } from '@/shared/lib';
import { useGetDashboardStatsApiV1DashboardAddressStatsGet } from '@/shared/types';
import { Group, Stack, Title, Typography } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';
import { BalanceOverview } from '@/widgets/BalanceOverview';
import { MyVaults } from '@/widgets/MyVaults';
import { PageHeader } from '@/widgets/PageHeader';
import { ProfitOverview } from '@/widgets/ProfitOverview';
import { Transactions } from '@/widgets/Transactions';

import { BaseLayout } from '../../../../app/layouts';
import DepositIcon from '../lib/assets/deposit.svg';

const DashboardV2Page = () => {
  const { isConnected, status, address } = useAppKitAccount();
  const { triggerToast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    if (status !== 'connecting' && status !== 'reconnecting' && !isConnected) {
      triggerToast({
        message: 'Wallet is not connected',
        description: 'You need to connect your wallet to use the Dashboard',
      });
      router.replace('/');
    }
  }, [isConnected, router, triggerToast, status]);

  const { data: statsData, isLoading: isDataLoading } =
    useGetDashboardStatsApiV1DashboardAddressStatsGet(address!, {
      query: {
        queryKey: [QueryKey.DashboardStats, address],
        enabled: Boolean(address),
      },
    });

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
      <BaseLayout.Container className="!px-0 pt-[15px] md:pt-[59px] flex flex-col gap-[46px]">
        <Group className="gap-6">
          <DashboardCard
            className="flex-1"
            icon={<DepositIcon />}
            title="My balance"
            isLoading={isLoadingStats}
          >
            ${formatUserMoney(stats?.total_balance)}
          </DashboardCard>
          {/*<DashboardCard*/}
          {/*  className="flex-1"*/}
          {/*  icon={<YieldIcon />}*/}
          {/*  title="Total yield"*/}
          {/*  isLoading={isLoadingStats}*/}
          {/*>*/}
          {/*  ${formatUserMoney(stats?.accrued_yield)}*/}
          {/*</DashboardCard>*/}
        </Group>

        <MyVaults walletAddress={address} />

        <Group className="gap-6">
          <BalanceOverview />
          <ProfitOverview />
        </Group>

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
