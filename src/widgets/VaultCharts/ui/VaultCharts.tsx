import React, { memo, useMemo } from 'react';

import { ChainId } from '@lifi/sdk';
import { BigNumber } from 'bignumber.js';
import dayjs from 'dayjs';

import { useOneClickLendingPools } from '@/entities/Vault';
import { useSeasonVaultPools } from '@/entities/Vault/model/useSeasonVaultPools';
import { QueryKey } from '@/shared/lib';
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
import { SeasonVaultBarChart } from '@/shared/ui/charts/BarChart';

import { rateNames, rateUnits, timeFramesRates } from '../lib/constants';
import { RateTab } from '../lib/types';

import { RateTabs } from './RateTabs';

interface VaultChartsProps {
  vaultId: number;
  vaultAddress: string;
  chainId: ChainId;
  distributionKey?: string;
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
  ({ vaultId, vaultAddress, chainId, distributionKey }: VaultChartsProps) => {
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
        {
          query: {
            queryKey: [QueryKey.FundHistories, timeFrame, vaultId],
            refetchInterval: 10_000,
          },
        },
      );

    const { data: lendingPools, isLoading: isLoadingLendingPools } =
      useOneClickLendingPools(
        vaultAddress,
        chainId,
        distributionKey === 'index',
      );

    const { data: seasonVaultData, isLoading: isLoadingSeasonVault } =
      useSeasonVaultPools(
        vaultAddress,
        chainId,
        distributionKey === 'seasonal',
      );

    const chartData = React.useMemo(() => {
      return formatDataChart(
        (rateTab === RateTab.apy
          ? data?.data.data?.apy_data
          : data?.data.data?.tvl_data) ?? [],
        rateTab,
      );
    }, [rateTab, data]);

    const isLoadingDistribution = isLoadingLendingPools || isLoadingSeasonVault;

    const noData =
      !isLoadingHistory &&
      chartData.length === 0 &&
      rateTab !== RateTab.distribution;

    const disabledKeys = useMemo(() => {
      const keys: string[] = [];

      if (isLoadingHistory) {
        keys.push(RateTab.apy, RateTab.tvl);
      }

      if (isLoadingSeasonVault || isLoadingLendingPools) {
        keys.push(RateTab.distribution);
      }

      return keys;
    }, [isLoadingHistory, isLoadingLendingPools, isLoadingSeasonVault]);

    return (
      <Stack className="gap-4">
        <Title order={4}>Historical Data</Title>
        <Group className="gap-2 justify-between items-start h-8">
          <RateTabs
            withDistribution={Boolean(distributionKey)}
            value={rateTab}
            onChange={setRateTab}
            disabledKeys={disabledKeys}
          />
          {timeFramesRates.includes(rateTab) && (
            <Select
              disabled={isLoadingHistory}
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
          {isLoadingHistory && rateTab !== RateTab.distribution && <Loader />}
          {isLoadingDistribution && rateTab === RateTab.distribution && (
            <Loader />
          )}

          {noData && (
            <Typography className="!text-white/60">
              No available data
            </Typography>
          )}

          {!isLoadingDistribution &&
            lendingPools &&
            rateTab === RateTab.distribution && (
              <PieChart data={lendingPools} />
            )}

          {!isLoadingDistribution &&
            seasonVaultData &&
            rateTab === RateTab.distribution && (
              <SeasonVaultBarChart data={seasonVaultData} />
            )}

          {!isLoadingHistory && !noData && rateTab !== RateTab.distribution && (
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
