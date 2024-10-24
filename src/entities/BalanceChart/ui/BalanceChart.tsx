import React, { Dispatch, SetStateAction } from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';
import clsx from 'clsx';
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryScatter,
  VictoryTheme,
  VictoryTooltip,
  VictoryZoomContainer,
} from 'victory';

import { CustomTooltip } from '@/entities/BalanceChart/ui/components';
import { ComponentWithProps, DashboardHistoryData } from '@/shared/types';
import { Loader, Text } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';
import { PeriodTab, periodTabs, TxActionType } from '@/widgets/BalanceHistory';
import { formatChartDate } from '@/widgets/BalanceHistory/utils';

import styles from './BalanceChart.module.scss';

type BalanceChartProps = {
  period: PeriodTab;
  setPeriod: Dispatch<SetStateAction<PeriodTab>>;
  hoveredTransaction: string | null;
  setHoveredTransaction: (tx: string | null) => void;
  data: DashboardHistoryData[];
  historyPeriod?: PeriodTab;
  isLoading?: boolean;
};

export const BalanceChart: ComponentWithProps<BalanceChartProps> = ({
  data,
  period,
  setPeriod,
  hoveredTransaction,
  setHoveredTransaction,
  isLoading = false,
  className,
}) => {
  const [width, setWidth] = React.useState<number>();
  const [chartWidth, setChartWidth] = React.useState(0);
  const chartRef = React.useRef<HTMLDivElement>(null);

  const onTabChange = React.useCallback(
    (period: PeriodTab) => {
      setPeriod(period);
    },
    [setPeriod],
  );

  const updateWidth = () => {
    setWidth(window.innerWidth);

    if (chartRef.current) {
      setChartWidth(chartRef.current.offsetWidth);
    }
  };

  React.useEffect(() => {
    window.addEventListener('resize', updateWidth);

    if (chartRef.current) {
      updateWidth();
    }

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, [chartRef.current?.offsetWidth]);

  // Process the data for the chart
  const chartData = data.map((item) => ({
    x: formatChartDate(item.ts, period),
    y: parseFloat(item.balance_usd),
    tx: item,
  }));

  return (
    <div ref={chartRef} className={clsx(styles.root, className)}>
      {isLoading ? (
        <Loader className={styles.loader} />
      ) : (
        <React.Fragment>
          {chartWidth && chartData.length ? (
            <VictoryChart
              theme={VictoryTheme.material}
              containerComponent={<VictoryZoomContainer zoomDimension="x" />}
              width={chartWidth - 7 * 2}
              height={width || 0 >= 1100 ? 450 : 350}
              domainPadding={{ x: 30, y: 10 }}
            >
              <VictoryAxis
                tickFormat={(t) => t}
                tickCount={5}
                style={{
                  axis: { stroke: 'transparent' },
                  ticks: { stroke: 'transparent' },
                  grid: { stroke: 'transparent' },
                }}
              />
              <VictoryAxis
                dependentAxis
                tickFormat={(x) => `$${formatUserMoney(x, 2)}`}
                style={{
                  grid: {
                    stroke: 'rgba(255, 255, 255, 0.09)',
                    strokeDasharray: '3,3',
                  },
                  axis: { stroke: 'transparent' },
                  ticks: { stroke: 'transparent' },
                }}
              />
              <VictoryLine
                data={chartData}
                style={{
                  data: { stroke: '#F9E727' },
                }}
              />
              <VictoryScatter
                data={chartData}
                size={5}
                style={{
                  data: {
                    fill: (d) =>
                      hoveredTransaction &&
                      hoveredTransaction === d.datum?.tx.transaction_hash
                        ? '#FFD700'
                        : '#24252E',
                    stroke: (d) =>
                      hoveredTransaction &&
                      hoveredTransaction === d.datum?.tx.transaction_hash
                        ? '#FFD700'
                        : '#F9E727',
                    strokeWidth: 3,
                  },
                }}
                labels={({ datum }) => ''}
                labelComponent={
                  <VictoryTooltip flyoutComponent={<CustomTooltip />} />
                }
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onMouseOver: () => [
                        {
                          target: 'data',
                          mutation: (props) => {
                            setHoveredTransaction(
                              props.datum.tx.transaction_hash,
                            );
                          },
                        },
                        {
                          target: 'labels',
                          mutation: () => ({ active: true }),
                        },
                      ],
                      onMouseOut: () => [
                        {
                          target: 'data',
                          mutation: () => {
                            setHoveredTransaction(null);
                          },
                        },
                        {
                          target: 'labels',
                          mutation: () => ({ active: false }),
                        },
                      ],
                    },
                  },
                ]}
              />
            </VictoryChart>
          ) : (
            <Text className={styles.emptyText}>No transactions</Text>
          )}
        </React.Fragment>
      )}
    </div>
  );
};
