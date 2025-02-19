import React, { memo } from 'react';

import { ChainId } from '@lifi/sdk';
import { BigNumber } from 'bignumber.js';
import dayjs from 'dayjs';
import numeral from 'numeral';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
} from 'recharts';

import {
  IOneClickLendingPool,
  useOneClickLendingPools,
} from '@/entities/Vault/model/useOneClickLendingPools';
import { QueryKey } from '@/shared/const';
import { useMediaQuery } from '@/shared/lib';
import {
  FundHistoryDayData,
  GetFundHistoriesApiV1VaultsFundIdHistoriesGetTimeframe,
  useGetFundHistoriesApiV1VaultsFundIdHistoriesGet,
} from '@/shared/types';
import { Group, Loader, Select, Stack, Title, Typography } from '@/shared/ui';

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
            <RenderPieChart data={lendingPools ?? []} />
          )}

          {!isLoading && !noData && rateTab !== RateTab.distribution && (
            <RenderLineChart
              dataKeyName={rateNames[rateTab]}
              unit={rateUnits[rateTab]}
              data={chartData}
            />
          )}
        </Stack>
      </Stack>
    );
  },
);

interface RenderLineData {
  name: string;
  date: string;
  value: string | number;
  unit?: string | number;
}

interface RenderLineChartProps {
  dataKeyName: string;
  unit?: string | number;
  data: Array<RenderLineData>;
}

const RenderLineChart = ({ unit, data, dataKeyName }: RenderLineChartProps) => (
  <ResponsiveContainer width="100%" height={250}>
    <AreaChart
      data={data}
      margin={{
        top: 30,
        bottom: 5,
        left: 5,
        right: 5,
      }}
      dataKey={dataKeyName}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#f9e7272b" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#f9e7272b" stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="value"
        name={dataKeyName}
        stroke="#F9E727"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="2" opacity={0.2} />
      <XAxis
        tick={{ fill: 'rgba(255,255,255,0.3)' }}
        dataKey="name"
        className="font-poppins text-xs"
      />
      <YAxis
        padding={{ bottom: 20, top: 20 }}
        tick={{ fill: 'rgba(255,255,255,0.3)' }}
        allowDecimals
        type="number"
        mirror={true}
        domain={['dataMin * 0.6', 'dataMax * 1.4']}
        className="font-poppins text-xs"
        fill="#fff"
        tickFormatter={(value: number) =>
          unit === '$'
            ? `${unit}${numeral(value).format('0.00a')}`
            : `${value}${unit}`
        }
      />
      <RechartsTooltip payload={data} content={<CustomTooltip />} />
    </AreaChart>
  </ResponsiveContainer>
);

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#ff2894'];

const RenderPieChart = ({ data }: { data: Array<IOneClickLendingPool> }) => {
  const isMedium = useMediaQuery('md');

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart className="max-w-[50%]">
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={!isMedium ? 80 : 50}
          fill="#8884d8"
          label={({ name, percent }) => `${name} (${(percent ?? 0) * 100}%)`}
          fontSize={!isMedium ? 16 : 9}
          className="outline-0"
        >
          {data.map((entry, index) => (
            <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

const CustomTooltip = (props: any) => {
  return (
    <div className="bg-background-chips rounded-lg p-4 flex flex-col gap-1">
      {props.payload.map((item: any) => (
        <React.Fragment>
          <Typography variant="caption" order={2}>
            {item.payload.date}
          </Typography>
          <Typography variant="caption" order={4} className="!text-white/60">
            {item.name}: {item.payload.unit === '$' && item.payload.unit}
            {numeral(item.payload.value).format('0.00a')}
            {item.payload.unit !== '$' && item.payload.unit}
          </Typography>
        </React.Fragment>
      ))}
    </div>
  );
};
