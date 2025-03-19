import React, { memo } from 'react';

import { ChainId } from '@lifi/sdk';
import { BigNumber } from 'bignumber.js';
import dayjs from 'dayjs';

import { useOneClickLendingPools } from '@/entities/Vault';
import { QueryKey } from '@/shared/const';
import {
  FundHistoryDayData,
  GetFundHistoriesApiV1VaultsFundIdHistoriesGetTimeframe,
  useGetFundHistoriesApiV1VaultsFundIdHistoriesGet,
} from '@/shared/types';
import {
  Group,
  LineChart,
  Loader,
  PieChart,
  Select,
  Stack,
  Title,
  Typography,
} from '@/shared/ui';

import { rateNames, rateUnits, timeFramesRates } from '../lib/constants';
import { RateTab } from '../lib/types';

import { RateTabs } from './RateTabs';

interface VaultChartsProps {
  vaultId: number;
  withDistribution?: boolean;
  vaultAddress: string;
  chainId: ChainId;
}

const timeFrames = ['Week', 'Month'];

const formatDataChart = (
  data: FundHistoryDayData['apy_data'] | FundHistoryDayData['tvl_data'],
  rate: RateTab,
) => {
  if (rate === RateTab.distribution) return [];

  return data.map((item) => ({
    name: dayjs(item.date).format('MM/DD'),
    date: dayjs(item.date).format('DD/MM/YYYY HH:mm'),
    value: BigNumber('apy' in item ? item.apy : item.tvl)
      .dp(2)
      .toNumber(),
    unit: rateUnits[rate],
  }));
};

export const VaultCharts = memo(
  ({ vaultId, withDistribution, vaultAddress, chainId }: VaultChartsProps) => {
    const [rateTab, setRateTab] = React.useState<RateTab>(RateTab.apy);
    const [timeFrame, setTimeFrame] = React.useState<string>('Week');
    const handleSelectionChange = (
      event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setTimeFrame(event.target.value);
    };

    const { data, isLoading: isLoadingHistory } =
      useGetFundHistoriesApiV1VaultsFundIdHistoriesGet(
        vaultId,
        {
          timeframe:
            timeFrame as GetFundHistoriesApiV1VaultsFundIdHistoriesGetTimeframe,
        },
        { query: { queryKey: [QueryKey.FundHistories, timeFrame, vaultId] } },
      );

    const { data: lendingPools, isLoading: isLoadingLendingPools } =
      useOneClickLendingPools(vaultAddress, chainId);

    const chartData = React.useMemo(() => {
      return formatDataChart(
        (rateTab === RateTab.apy
          ? data?.data.data?.apy_data
          : data?.data.data?.tvl_data) ?? [],
        rateTab,
      );
    }, [rateTab, data]);

    const isLoading = isLoadingHistory || isLoadingLendingPools;

    const noData =
      !isLoading && chartData.length === 0 && rateTab !== RateTab.distribution;

    return (
      <Stack className="gap-4">
        <Title order={4}>Historical Data</Title>
        <Group className="gap-2 justify-between items-start h-8">
          <RateTabs
            withDistribution={withDistribution}
            isDisabled={isLoading}
            value={rateTab}
            onChange={setRateTab}
          />
          {timeFramesRates.includes(rateTab) && (
            <Select
              disabled={isLoading}
              aria-label="Timeframe"
              placeholder="Timeframe"
              size="sm"
              className="max-w-[124px]"
              selectionMode="single"
              selectedKeys={[timeFrame]}
              onChange={handleSelectionChange}
            >
              {timeFrames.map((timeFrame) => (
                <Select.Item key={timeFrame}>{timeFrame}</Select.Item>
              ))}
            </Select>
          )}
        </Group>

        <Stack className="bg-black rounded-[20px] border border-stroke-tableBorder min-h-[250px] flex items-center justify-center">
          {isLoading && <Loader />}

          {noData && (
            <Typography className="!text-white/60">
              No available data
            </Typography>
          )}

          {!isLoading && rateTab === RateTab.distribution && (
            <PieChart data={lendingPools ?? []} />
          )}

          {!isLoading && !noData && rateTab !== RateTab.distribution && (
            <LineChart
              dataKeyName={rateNames[rateTab]}
              unit={rateUnits[rateTab]}
              data={chartData}
              responsiveContainerProps={{ height: 250 }}
            />
          )}
        </Stack>
      </Stack>
    );
  },
);
