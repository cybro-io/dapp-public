'use client';

import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { useWeb3ModalAccount } from '@/shared/lib';
import { Transactions } from '@/widgets/Transactions';

export const TransactionsPage = () => {
  const { address } = useWeb3ModalAccount();

  return (
    <BaseLayout>
      <Transactions walletAddress={address ?? ''} />
    </BaseLayout>
  );
};
