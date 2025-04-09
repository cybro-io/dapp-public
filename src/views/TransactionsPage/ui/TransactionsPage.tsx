'use client';

import React from 'react';

import { useWeb3ModalAccount } from '@/shared/lib';
import { Transactions } from '@/widgets/Transactions';

import { BaseLayout } from '../../../../app/layouts';

export const TransactionsPage = () => {
  const { address } = useWeb3ModalAccount();

  return (
    <BaseLayout>
      <Transactions walletAddress={address ?? ''} />
    </BaseLayout>
  );
};
