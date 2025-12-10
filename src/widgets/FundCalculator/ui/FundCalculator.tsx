import React, { HTMLAttributes } from 'react';

import { Tab } from '@heroui/tabs';
import { useFlag } from '@unleash/proxy-client-react';
import clsx from 'clsx';

import { TiersBanner } from '@/entities/Staking';
import { Flag } from '@/shared/lib';
import { VaultResponseData } from '@/shared/types';
import { Stack } from '@/shared/ui';
import { FundCalculatorContextProvider } from '@/widgets/FundCalculator';

import { FundCalculatorTabs } from './FundCalculatorTabs';

interface FundCalculatorProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  vault: VaultResponseData;
}

export const FundCalculator = ({ vault, className }: FundCalculatorProps) => {
  const isEnabledTiers = useFlag(Flag.tiers);

  return (
    <FundCalculatorContextProvider vault={vault}>
      <Stack
        className={clsx(
          'sticky top-[100px] flex-nowrap gap-[30px] h-fit',
          className,
        )}
      >
        <div className="p-6 rounded-[30px] bg-background-modal flex flex-col gap-4 w-[375px] h-fit">
          <FundCalculatorTabs isDepositDisabled={vault.is_deposit_disabled}>
            {(item) => (
              <Tab key={item.label} title={item.label}>
                <item.Component />
              </Tab>
            )}
          </FundCalculatorTabs>
        </div>
        {isEnabledTiers && <TiersBanner />}
      </Stack>
    </FundCalculatorContextProvider>
  );
};
