import React from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';
import clsx from 'clsx';

import { YieldSwitchOptions } from '@/shared/const';
import { ComponentWithProps } from '@/shared/types';

import styles from './DepositWithdrawTabs.module.scss';

const tabs = [
  {
    title: 'Withdraw',
    key: YieldSwitchOptions.Withdraw,
  },
  {
    title: 'Deposit',
    key: YieldSwitchOptions.Deposit,
  },
];

type DepositWithdrawTabsProps = {
  activeTab: YieldSwitchOptions;
  setActiveTab: (activeTab: any) => void;
  size?: 'sm' | 'md' | 'lg';
};

export const DepositWithdrawTabs: ComponentWithProps<
  DepositWithdrawTabsProps
> = ({ activeTab, setActiveTab, size = 'lg', className }) => {
  return (
    <Tabs
      className={clsx(styles.tabs, className)}
      onSelectionChange={setActiveTab}
      defaultSelectedKey={activeTab}
      fullWidth
      size={size}
    >
      {tabs.map(({ title, key }) => (
        <Tab
          key={key}
          title={title}
          className={clsx(styles.tab, key === activeTab && styles.activeTab)}
        />
      ))}
    </Tabs>
  );
};
