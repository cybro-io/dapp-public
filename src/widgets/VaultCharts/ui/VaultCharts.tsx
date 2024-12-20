import React, { memo } from 'react';

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

import { useMediaQuery } from '@/shared/lib';
import {
  FundHistoryDayData,
  GetFundHistoriesApiV1VaultsVaultIdHistoriesGetTimeframe,
  HistoryAPYResponseData,
  useGetFundHistoriesApiV1VaultsVaultIdHistoriesGet,
  useGetFundHistoryApyApiV1VaultsVaultIdHistoryApyGet,
} from '@/shared/types';
import { Card, Loader, Select, Text, TextView } from '@/shared/ui';

import { rateNames, rateUnits, timeFramesRates } from '../lib/constants';
import { RateTab } from '../lib/types';

import { RateTabs } from './RateTabs';

interface VaultChartsProps {
  vaultId: number;
  withDistribution?: boolean;
}

const timeFrames = ['Month', 'Year', 'All'];

const formatDataChart = (data: FundHistoryDayData[], rate: RateTab) => {
  if (rate === RateTab.apy || rate === RateTab.distribution) return [];

  return data
    .sort((a, b) => dayjs(a.day).valueOf() - dayjs(b.day).valueOf())
    .filter((item) => item[rate])
    .map((item) => ({
      name: dayjs(item.day).format('MM/DD'),
      value: BigNumber(item[rate] as unknown as string)
        .dp(2)
        .toNumber(),
      unit: rateUnits[rate],
    }));
};

const formatApyDataChart = (data: HistoryAPYResponseData[]) => {
  return data
    .filter((item) => item.apy)
    .map((item) => ({
      name: item.month,
      value: BigNumber(item.apy).multipliedBy(100).dp(2).toNumber(),
      unit: rateUnits[RateTab.apy],
    }));
};

export const VaultCharts = memo(
  ({ vaultId, withDistribution }: VaultChartsProps) => {
    const [rateTab, setRateTab] = React.useState<RateTab>(RateTab.tvl);
    const [timeFrame, setTimeFrame] = React.useState<string>('All');
    const handleSelectionChange = (
      event: React.ChangeEvent<HTMLSelectElement>,
    ) => {
      setTimeFrame(event.target.value);
    };

    const { data: apyData, isLoading: isLoadingApy } =
      useGetFundHistoryApyApiV1VaultsVaultIdHistoryApyGet(vaultId, {
        query: { queryKey: ['getApy', vaultId] },
      });

    const { data, isLoading: isLoadingHistory } =
      useGetFundHistoriesApiV1VaultsVaultIdHistoriesGet(
        vaultId,
        {
          timeframe:
            timeFrame as GetFundHistoriesApiV1VaultsVaultIdHistoriesGetTimeframe,
        },
        { query: { queryKey: ['getFundHistories', timeFrame, vaultId] } },
      );

    const chartData = React.useMemo(() => {
      if (rateTab === RateTab.apy) {
        return formatApyDataChart(apyData?.data.data ?? []);
      }

      return formatDataChart(data?.data.data ?? [], rateTab);
    }, [rateTab, apyData, data]);

    const isLoading =
      (isLoadingApy || isLoadingHistory) && rateTab !== RateTab.distribution;

    const noData =
      !isLoading && chartData.length === 0 && rateTab !== RateTab.distribution;

    return (
      <Card>
        <Card.Header className="flex flex-row flex-wrap gap-2 justify-between !px-3 md:px-6">
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
        </Card.Header>
        <Card.Content
          id="chart-wrapper"
          className="px-1 md:px-6 !bg-transparent"
        >
          {isLoading && (
            <div className="flex justify-center">
              <Loader />
            </div>
          )}

          {rateTab === RateTab.distribution && <RenderPieChart />}

          {noData && (
            <div className="w-full flex justify-center items-center h-[250px]">
              <Text className="!text-white/60">No available data</Text>
            </div>
          )}

          {!noData && rateTab !== RateTab.distribution && (
            <RenderLineChart
              dataKeyName={rateNames[rateTab]}
              unit={rateUnits[rateTab]}
              data={chartData}
            />
          )}
        </Card.Content>
      </Card>
    );
  },
);

interface RenderLineData {
  name: string;
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
        top: 5,
        right: 30,
        left: 30,
        bottom: 5,
      }}
      dataKey={dataKeyName}
    >
      <Area
        type="monotone"
        dataKey="value"
        name={dataKeyName}
        stroke="#F9E727"
        fill="#f9e7272b"
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="2" opacity={0.2} />
      <XAxis
        tick={{ fill: 'rgba(255,255,255,0.3)' }}
        dataKey="name"
        className="font-poppins text-xs"
      />
      <YAxis
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

const pieData = [
  { name: 'ZeroLend USDB', value: 10 },
  { name: 'Init Capital USDB', value: 30 },
  { name: 'Juice USDB', value: 30 },
  { name: 'Orbit USDB', value: 30 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#ff2894'];

const RenderPieChart = () => {
  const isMedium = useMediaQuery('md');

  return (
    <ResponsiveContainer width="100%" height={250}>
      <PieChart className="max-w-[50%]">
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={pieData}
          cx="50%"
          cy="50%"
          outerRadius={!isMedium ? 80 : 50}
          fill="#8884d8"
          label={({ name, percent }) => `${name} (${(percent ?? 0) * 100}%)`}
          fontSize={!isMedium ? 16 : 9}
          className="outline-0"
        >
          {pieData.map((entry, index) => (
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
      <Text textView={TextView.C2}>{props.label}</Text>

      {props.payload.map((item: any) => (
        <Text textView={TextView.C4} className="!text-white/60">
          {item.name}: {item.payload.unit === '$' && item.payload.unit}
          {numeral(item.payload.value).format('0.00a')}
          {item.payload.unit !== '$' && item.payload.unit}
        </Text>
      ))}
    </div>
  );
};
