'use client';

import React from 'react';

import { Tooltip } from '@nextui-org/react';
import clsx from 'clsx';
import {
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  XAxis,
  YAxis,
  ScatterProps,
} from 'recharts';

import { ComponentWithProps } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';

import styles from './HistoricalApyData.module.scss';

type HistoricalApyDataProps = {};

const data = [
  { x: 'Jan', y: 35000, percent: '10%', index: 0 },
  { x: 'Feb', y: 40000, percent: '12%', index: 1 },
  { x: 'Mar', y: 38500, percent: '11.5%', index: 2 },
  { x: 'Apr', y: 45000, percent: '14.5%', index: 3 },
  { x: 'May', y: 53500, percent: '16%', index: 4 },
  { x: 'Jun', y: 35000, percent: '10%', index: 5 },
  { x: 'Jul', y: 40000, percent: '12%', index: 6 },
  { x: 'Aug', y: 38500, percent: '11.5%', index: 7 },
  { x: 'Sep', y: 45000, percent: '14.5%', index: 8 },
  { x: 'Oct', y: 48000, percent: '16%', index: 9 },
];

const CustomDotWithLine: ScatterProps['shape'] = (props: any) => {
  const { cx, cy, payload } = props;
  const isGold = payload.index % 2 === 0;
  const fillColor = isGold ? 'transparent' : '#24252E';
  const strokeColor = isGold ? '#F9E727' : '#3A3B45';
  const lineStroke = 'rgba(255, 255, 255, 0.5)';

  return (
    <g>
      <line
        x1={cx}
        y1={cy + 11}
        x2={cx}
        y2={230}
        stroke={lineStroke}
        strokeWidth={1}
        strokeDasharray="3 3"
      />
      <circle
        cx={cx}
        cy={cy}
        r={6}
        stroke={strokeColor}
        strokeWidth={3}
        fill={fillColor}
      />
      <text
        x={cx}
        y={cy - 15}
        textAnchor="middle"
        fill="#fff"
        fontSize={10}
        fontWeight={600}
      >
        {payload.percent}
      </text>
    </g>
  );
};

export const HistoricalApyData: ComponentWithProps<HistoricalApyDataProps> = ({
  className,
}) => {
  const yAxisTickFormatter = (value: number) => `$${value / 1000}K`;

  return (
    <section className={clsx(styles.root, className)}>
      <Text className={styles.heading} textView={TextView.H3}>
        Historical APY Data
      </Text>
      <Text className={styles.description} textView={TextView.P3}>
        This section shows the historical APY for our High Yield BTC Strategy
        vault, highlighting its success in leveraging market trends to enhance
        returns for Vault investors.
      </Text>
      <ResponsiveContainer
        className={styles.chartContainer}
        width="100%"
        height={265}
      >
        <ScatterChart margin={{ top: 20, bottom: 10 }}>
          <CartesianGrid vertical={false} stroke="rgba(255, 255, 255, 0.09)" />
          <XAxis dataKey="x" name="Month" axisLine={false} tickLine={false} />
          <YAxis
            dataKey="y"
            name="Amount"
            domain={[30000, 60000]}
            tickCount={7}
            tickFormatter={yAxisTickFormatter}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip />
          <Scatter name="Data" data={data} shape={CustomDotWithLine} />
        </ScatterChart>
      </ResponsiveContainer>
    </section>
  );
};
