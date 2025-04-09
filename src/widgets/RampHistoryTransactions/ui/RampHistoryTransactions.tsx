import React from 'react';

import { useMunzenTransactions } from '@/entities/Munzen';
import { useWeb3ModalAccount } from '@/shared/lib';

export const RampHistoryTransactions = () => {
  const { address } = useWeb3ModalAccount();

  const { transactions, isLoading } = useMunzenTransactions(address);

  return <div></div>;
};
