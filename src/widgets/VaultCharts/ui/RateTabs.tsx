import React, { memo } from 'react';

import { Tab, Tabs, TabsProps } from '@heroui/tabs';

import { Nullable } from '@/shared/types';

import { useChartRates } from '../lib/constants';
import { RateTab } from '../lib/types';

interface RateTabsProps extends Pick<TabsProps, 'disabledKeys'> {
  value: RateTab;
  onChange: (value: RateTab) => void;
  tags: Nullable<string[]>;
}

export const RateTabs = memo(
  ({ onChange, value, tags, ...props }: RateTabsProps) => {
    const { visibleCharts } = useChartRates(tags);

    return (
      <Tabs
        size="sm"
        items={visibleCharts}
        classNames={{
          tab: 'px-2.5',
          tabList: 'rounded-full p-0.5 bg-background-chips gap-0.5',
          cursor: 'rounded-full dark:bg-white bg-white',
          tabContent: 'group-data-[selected=true]:text-black font-poppins',
        }}
        selectedKey={value}
        onSelectionChange={(val) => onChange(val as RateTab)}
        {...props}
      >
        {({ key, title }) => <Tab key={key} title={title} value={key}></Tab>}
      </Tabs>
    );
  },
);
