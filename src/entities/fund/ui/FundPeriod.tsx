import React, { memo } from 'react';

import { Tab, Tabs } from '@heroui/tabs';

export enum PeriodTab {
  Year = 'year',
  Quarter = 'quarter',
  Month = 'month',
}

const periods = [
  {
    key: PeriodTab.Year,
    title: 'Year',
  },
  {
    key: PeriodTab.Quarter,
    title: 'Quarter',
  },
  {
    key: PeriodTab.Month,
    title: 'Month',
  },
];

interface FundPeriodProps {
  value: PeriodTab;
  onChange: (value: PeriodTab) => void;
}
export const FundPeriod = memo(({ onChange, value }: FundPeriodProps) => (
  <Tabs
    size="sm"
    items={periods}
    classNames={{
      tab: 'px-2.5',
      tabList: 'rounded-full p-0.5 bg-background-chips gap-0.5',
      cursor: 'rounded-full dark:bg-white bg-white',
      tabContent: 'group-data-[selected=true]:text-black font-poppins',
    }}
    selectedKey={value}
    onSelectionChange={(val) => onChange(val as PeriodTab)}
  >
    {({ key, title }) => <Tab key={key} title={title} value={key}></Tab>}
  </Tabs>
));
