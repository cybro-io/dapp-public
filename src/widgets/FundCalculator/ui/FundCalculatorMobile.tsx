import React, { HTMLAttributes } from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { Tab } from '@nextui-org/tabs';

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
  const [tabSelected, setTabSelected] = React.useState<string | number>(
    'Deposit',
  );

  const modal = NiceModal.useModal(FundCalculatorModal);
  const handleTabSelected = (tab: string | number) => {
    if (!vault) return;

    modal.show({
      vault,
      type: tab.toString().toLowerCase() as 'deposit' | 'withdraw',
    });
    setTabSelected(tab);
  };

  return (
    <div className={className}>
      <FundCalculatorTabs
        onSelectionChange={handleTabSelected}
        selectedKey={tabSelected}
      >
        {(item) => <Tab key={item.label} title={item.label} />}
      </FundCalculatorTabs>
    </div>
  );
};
