'use client';

import React from 'react';

import {
  Bar,
  BarChart as RechartsBarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { SeasonVaultTooltip } from '@/shared/ui/charts/BarChart/SeasonVaultTooltip';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

export interface BarChartData {
  name: string;
  free: number;
  investmentInIndex: number;
  liquidityPosition: number;
}

export const SeasonVaultBarChart = ({
  data,
}: {
  data: Array<BarChartData>;
}) => {
  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartsBarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip payload={data} content={<SeasonVaultTooltip />} />
        <Legend />

        <Bar dataKey="free" name="Free balance" stackId="a" fill={COLORS[0]} />
        <Bar
          dataKey="investmentInIndex"
          name="Investment in index vault"
          stackId="a"
          fill={COLORS[1]}
        />
        <Bar
          dataKey="liquidityPosition"
          name="Liquidity position"
          stackId="a"
          fill={COLORS[2]}
        />
      </RechartsBarChart>
    </ResponsiveContainer>
  );
};
