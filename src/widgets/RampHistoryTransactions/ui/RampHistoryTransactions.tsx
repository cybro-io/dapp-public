import React from 'react';

import { useMunzenTransactions } from '@/entities/Munzen';
import { useAppKitAccount } from '@/shared/lib';

export const RampHistoryTransactions = () => {
  const { address } = useAppKitAccount();

  const { transactions, isLoading } = useMunzenTransactions(address);

  return <div></div>;
};
