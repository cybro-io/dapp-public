import React, { HTMLAttributes } from 'react';

import { Tab } from '@nextui-org/tabs';
import clsx from 'clsx';

import { VaultResponseData } from '@/shared/types';
import { FundCalculatorContextProvider } from '@/widgets/FundCalculator';

import { FundCalculatorTabs } from './FundCalculatorTabs';

interface FundCalculatorProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  vault: VaultResponseData;
}

export const FundCalculator = ({ vault, className }: FundCalculatorProps) => {
  const [tabSelected, setTabSelected] = React.useState<string | number>(
    'Deposit',
  );

  return (
    <FundCalculatorContextProvider vault={vault}>
      <div
        className={clsx(
          'sticky top-[100px] p-6 rounded-lg bg-background-chips/50 flex flex-col gap-4 w-[375px] h-fit',
          className,
        )}
      >
        <FundCalculatorTabs
          selectedKey={tabSelected}
          onSelectionChange={setTabSelected}
        >
          {(item) => (
            <Tab key={item.label} title={item.label}>
              <item.Component />
            </Tab>
          )}
        </FundCalculatorTabs>
      </div>
    </FundCalculatorContextProvider>
  );
};
