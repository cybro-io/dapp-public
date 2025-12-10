import React from 'react';

import { FundDepositContextProvider } from '@/features/FundDeposit';
import { RoundedCard } from '@/shared/ui';

import { FundDepositButton } from './FundDepositButton';
import { FundDepositContent } from './FundDepositContent';
import { FundDepositHeader } from './FundDepositHeader';
import { FundDepositPeriod } from './FundDepositPeriod';
import { FundDepositProcessModal } from './FundDepositProcessModal';
import { FundDepositProfit } from './FundDepositProfit';

export const FundDeposit = () => {
  return (
    <FundDepositContextProvider>
      <div className="flex flex-col gap-4">
        <RoundedCard
          slots={{ header: <FundDepositHeader /> }}
          classNames={{ content: 'px-4' }}
        >
          <FundDepositContent />
        </RoundedCard>

        <FundDepositPeriod />

        <FundDepositProfit />

        <FundDepositButton />
      </div>
      <FundDepositProcessModal />
    </FundDepositContextProvider>
  );
};
