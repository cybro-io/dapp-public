import React, { HTMLAttributes } from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { Tab } from '@heroui/tabs';
import clsx from 'clsx';

import { VaultResponseData } from '@/shared/types';

import { FundCalculatorModal } from './FundCalculatorModal';
import { FundCalculatorTabs } from './FundCalculatorTabs';

interface FundCalculatorMobileProps
  extends Pick<HTMLAttributes<HTMLDivElement>, 'className'> {
  vault: VaultResponseData;
}

export const FundCalculatorMobile = ({
  vault,
  className,
}: FundCalculatorMobileProps) => {
  const modal = NiceModal.useModal(FundCalculatorModal);
  const handleTabSelected = (tab: string | number) => {
    if (!vault) return;

    modal.show({
      vault,
      type: tab.toString().toLowerCase() as 'deposit' | 'withdraw',
    });
  };

  return (
    <div className={clsx(className, 'z-10')}>
      <FundCalculatorTabs
        onSelectionChange={handleTabSelected}
        isDepositDisabled={vault.is_deposit_disabled}
      >
        {(item) => <Tab key={item.label} title={item.label} />}
      </FundCalculatorTabs>
    </div>
  );
};
