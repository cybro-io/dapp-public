import React from 'react';

import { useFlag } from '@unleash/proxy-client-react';
import dayjs from 'dayjs';

import { Flag } from '@/shared/lib';
import {
  Group,
  LineChart,
  Loader,
  PeriodTabs,
  Stack,
  Title,
} from '@/shared/ui';

import { balanceOverviewPeriods } from '../lib/constants';
import { useProfitOverview } from '../model/useProfitOverview';

export const ProfitOverview = () => {
  const { profitData, isLoading, period, setPeriod } = useProfitOverview();

  const isEnabledFlag = useFlag(Flag.profitOverview);

  if (!isEnabledFlag) {
    return null;
  }

  return (
    <Stack className="gap-5 flex-1 min-w-full md:min-w-[512px]">
      <Group className="justify-center sm:justify-between gap-y-3">
        <Title order={3} uppercase className="text-center sm:text-left">
          Profit Overview
        </Title>
        <PeriodTabs
          periods={balanceOverviewPeriods}
          period={period}
          onPeriodChange={setPeriod}
        />
      </Group>
      <Stack className="bg-black rounded-[20px] border border-stroke-tableBorder min-h-[300px] flex items-center justify-center">
        {isLoading && <Loader />}

        {!isLoading && (
          <LineChart
            dataKeyName="Profit"
            data={profitData.map((data) => ({
              name: dayjs(data.date).format('MMM/DD'),
              date: dayjs(data.date).format('DD/MM/YYYY'),
              value: Number(data.profit_usd),
              unit: '$',
            }))}
            unit="$"
            responsiveContainerProps={{ height: 300 }}
          />
        )}
      </Stack>
    </Stack>
  );
};
