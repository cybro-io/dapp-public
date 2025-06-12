'use client';

import React from 'react';

import {
  Cell,
  Pie,
  PieChart as RechartPieChart,
  ResponsiveContainer,
} from 'recharts';

import { useMediaQuery } from '@/shared/lib';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#ff2894'];

interface PieChartData {
  name: string;
  value: number;
}

export const PieChart = ({ data }: { data: Array<PieChartData> }) => {
  const isMedium = useMediaQuery('md');

  return (
    <ResponsiveContainer width="100%" height={250}>
      <RechartPieChart className="max-w-[50%]">
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
      </RechartPieChart>
    </ResponsiveContainer>
  );
};
