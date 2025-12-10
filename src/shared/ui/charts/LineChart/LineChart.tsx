'use client';

import React from 'react';

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

import { LineChartTooltip } from './LineChartTooltip';

interface RenderLineData {
  name: string;
  date: string;
  value: string | number;
  unit?: string | number;
}

interface RenderLineChartProps extends Pick<ResponsiveContainerProps, 'width'> {
  dataKeyName: string;
  unit?: string | number;
  data: Array<RenderLineData>;
  responsiveContainerProps?: Pick<ResponsiveContainerProps, 'height'>;
}

export const LineChart = ({
  unit,
  data,
  dataKeyName,
  responsiveContainerProps,
  width,
}: RenderLineChartProps) => (
  <ResponsiveContainer width={width ?? '100%'} {...responsiveContainerProps}>
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
            : unit === 'numeral'
              ? `${numeral(value).format('0.00a')}`
              : `${value}${unit}`
        }
      />
      <RechartsTooltip payload={data} content={<LineChartTooltip />} />
    </AreaChart>
  </ResponsiveContainer>
);
