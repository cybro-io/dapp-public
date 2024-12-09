import React from 'react';

import { Tabs, TabsProps } from '@nextui-org/tabs';

import { FundDeposit } from '@/features/FundDeposit';
import { FundWithdraw } from '@/features/FundWithdraw';

const tabItems = [
  { label: 'Deposit', Component: FundDeposit },
  { label: 'Withdraw', Component: FundWithdraw },
];

type FundCalculatorTabsProps = Pick<
  TabsProps<(typeof tabItems)[0]>,
  'children' | 'selectedKey' | 'onSelectionChange'
>;

export const FundCalculatorTabs = ({
  children,
  ...props
}: FundCalculatorTabsProps) => {
  return (
    <Tabs<(typeof tabItems)[0]>
      aria-label="fund-calculator-tabs"
      classNames={{
        base: 'w-full',
        tabList: 'p-1 w-full bg-background-chips h-[61px]',
        tab: 'h-full text-sm font-extrabold uppercase font-unbounded',
        cursor: 'dark:bg-background-window',
        panel: 'p-0',
      }}
      items={tabItems}
      {...props}
    >
      {children}
    </Tabs>
  );
};
