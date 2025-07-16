'use client';

import React from 'react';

import { Tab, Tabs } from '@heroui/tabs';
import { useMediaQuery } from 'usehooks-ts';

import { Text, TextView } from '@/shared/ui';

import { useExchangeTransactionHistory } from '../model/useExchangeTransactionHistory';

export const ExchangeTransactionHistory = () => {
  const { registerTabs, tabs } = useExchangeTransactionHistory();
  const isSmallScreen = useMediaQuery('(max-width: 1280px)');

  return (
    <div className="flex-1 flex flex-col gap-6 items-center lg:items-stretch">
      <Text textView={isSmallScreen ? TextView.H4 : TextView.H2}>
        Transactions History
      </Text>
      <Tabs
        aria-label="exchange-transactions-tabs"
        classNames={{
          base: 'w-full max-w-[375px] lg:w-fit',
          tabList: 'w-full rounded-full bg-background-chips',
          cursor: 'rounded-full dark:bg-white',
          tabContent:
            'group-data-[selected=true]:text-black/100 font-poppins text-xs font-medium',
        }}
        {...registerTabs()}
      >
        {tabs.map(({ name, Component }) => (
          <Tab key={name} title={name}>
            <Component />
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
