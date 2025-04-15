'use client';

import React from 'react';

import { useAppKitAccount } from '@/shared/lib';
import { Transactions } from '@/widgets/Transactions';

import { BaseLayout } from '../../../../app/layouts';

export const TransactionsPage = () => {
  const { address } = useAppKitAccount();

  return (
    <BaseLayout>
      <Transactions walletAddress={address ?? ''} />
    </BaseLayout>
  );
};
