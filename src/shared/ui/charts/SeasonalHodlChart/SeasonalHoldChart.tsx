'use client';

import React from 'react';

import dayjs from 'dayjs';
import numeral from 'numeral';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  XAxis,
  YAxis,
  ResponsiveContainerProps,
} from 'recharts';

import { SeasonalChartData } from '@/shared/types';

import { SeasonHoldChartTooltip } from './SeasonHoldChartTooltip';

type RenderLineData = SeasonalChartData;

interface RenderLineChartProps {
  data: Array<RenderLineData>;
  responsiveContainerProps?: Pick<
    ResponsiveContainerProps,
    'height' | 'width' | 'minHeight'
  >;
}

export const SeasonalHoldChart = ({
  data,
  responsiveContainerProps,
}: RenderLineChartProps) => (
  <ResponsiveContainer
    {...responsiveContainerProps}
    width={responsiveContainerProps?.width ?? '100%'}
  >
    <AreaChart
      data={data}
      margin={{
        top: 30,
        bottom: 5,
        left: 5,
        right: 5,
      }}
    >
      <defs>
        <linearGradient id="colorBtc" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#f9e7272b" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#f9e7272b" stopOpacity={0.1} />
        </linearGradient>

        <linearGradient id="colorSharePrice" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#ffc658" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#ffc658" stopOpacity={0.1} />
        </linearGradient>
      </defs>
      <Area
        type="monotone"
        dataKey="btc_normalized"
        name="btc_normalized"
        stroke="#F9E727"
        fillOpacity={1}
        fill="url(#colorBtc)"
      />
      <Area
        type="monotone"
        dataKey="share_price"
        name="share_price"
        stroke="#ffc658"
        fillOpacity={1}
        fill="url(#colorSharePrice)"
      />
      <CartesianGrid stroke="#ccc" strokeDasharray="2" opacity={0.2} />
      <XAxis
        tick={{ fill: 'rgba(255,255,255,0.3)' }}
        dataKey="day"
        tickFormatter={(date: string) => dayjs(date).format('DD/MM')}
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
        tickFormatter={(value: number) => `${numeral(value).format('0.00a')}`}
      />
      <RechartsTooltip content={<SeasonHoldChartTooltip />} />
    </AreaChart>
  </ResponsiveContainer>
);
