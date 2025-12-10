'use client';

import React from 'react';

import { FundWithdrawContextProvider } from '@/features/FundWithdraw';
import { RoundedCard } from '@/shared/ui';

import { FundWithdrawButton } from './FundWithdrawButton';
import { FundWithdrawContent } from './FundWithdrawContent';
import { FundWithdrawHeader } from './FundWithdrawHeader';
import { FundWithdrawProcessModal } from './FundWithdrawProcessModal';
import { FundWithdrawReceive } from './FundWithdrawReceive';

export const FundWithdraw = () => {
  return (
    <FundWithdrawContextProvider>
      <div className="flex flex-col gap-4">
        <RoundedCard
          slots={{ header: <FundWithdrawHeader /> }}
          classNames={{ content: 'px-4' }}
        >
          <FundWithdrawContent />
        </RoundedCard>

        <FundWithdrawReceive />

        <FundWithdrawButton />
      </div>
      <FundWithdrawProcessModal />
    </FundWithdrawContextProvider>
  );
};
