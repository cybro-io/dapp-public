import React from 'react';

import dayjs from 'dayjs';

import {
  Group,
  LineChart,
  Loader,
  PeriodTabs,
  Stack,
  Title,
} from '@/shared/ui';

import { balanceOverviewPeriods } from '../lib/constants';
import { useBalanceOverview } from '../model/useBalanceOverview';

export const BalanceOverview = () => {
  const { balanceData, isLoading, period, setPeriod } = useBalanceOverview();

  return (
    <Stack className="gap-5">
      <Group className="justify-center sm:justify-between gap-y-3">
        <Title order={3} uppercase className="text-center sm:text-left">
          Balance Overview
        </Title>
        <PeriodTabs
          periods={balanceOverviewPeriods}
          period={period}
          onPeriodChange={setPeriod}
        />
      </Group>
      <Stack className="bg-black rounded-[20px] border border-stroke-tableBorder min-h-[250px] flex items-center justify-center">
        {isLoading && <Loader />}

        <LineChart
          dataKeyName="Balance"
          data={balanceData.map((data) => ({
            name: dayjs(data.date).format('MMM/DD'),
            date: dayjs(data.date).format('DD/MM/YYYY'),
            value: Number(data.balance_usd),
            unit: '$',
          }))}
          unit="$"
          responsiveContainerProps={{ height: 450 }}
        />
      </Stack>
    </Stack>
  );
};
