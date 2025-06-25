import React from 'react';

import { Tabs, TabsProps } from '@heroui/tabs';

import { FundDeposit } from '@/features/FundDeposit';
import { FundWithdraw } from '@/features/FundWithdraw';

const tabItems = [
  { label: 'Deposit', Component: FundDeposit },
  { label: 'Withdraw', Component: FundWithdraw },
];

type FundCalculatorTabsProps = Pick<
  TabsProps<(typeof tabItems)[0]>,
  'children' | 'onSelectionChange'
> & { isDepositDisabled?: boolean };

export const FundCalculatorTabs = ({
  children,
  isDepositDisabled,
  onSelectionChange,
}: FundCalculatorTabsProps) => {
  const [tabSelected, setTabSelected] = React.useState<string | number>(
    isDepositDisabled ? 'Withdraw' : 'Deposit',
  );

  const filteredTabs = isDepositDisabled ? [tabItems[1]] : tabItems;

  return (
    <Tabs<(typeof tabItems)[0]>
      aria-label="fund-calculator-tabs"
      classNames={{
        base: 'w-full',
        tabList: 'p-1 w-full bg-background-chips h-[61px]',
        tab: 'h-full text-sm font-extrabold uppercase font-unbounded',
        cursor: 'dark:bg-background-modal',
        panel: 'p-0',
      }}
      items={filteredTabs}
      selectedKey={tabSelected}
      onSelectionChange={(value) => {
        setTabSelected(value);
        onSelectionChange?.(value);
      }}
    >
      {children}
    </Tabs>
  );
};
