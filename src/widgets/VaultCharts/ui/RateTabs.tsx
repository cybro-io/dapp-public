import React, { memo } from 'react';

import { Tab, Tabs, TabsProps } from '@nextui-org/tabs';

import { chartsRates } from '../lib/constants';
import { RateTab } from '../lib/types';

interface RateTabsProps extends Pick<TabsProps, 'isDisabled'> {
  value: RateTab;
  onChange: (value: RateTab) => void;
  withDistribution?: boolean;
}
export const RateTabs = memo(
  ({ onChange, value, withDistribution, ...props }: RateTabsProps) => (
    <Tabs
      size="sm"
      items={
        withDistribution
          ? chartsRates
          : chartsRates.filter((rate) => rate.key !== RateTab.distribution)
      }
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
  ),
);
