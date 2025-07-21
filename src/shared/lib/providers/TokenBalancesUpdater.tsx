'use client';

import { useTokenBalancesByChain } from '@/shared/lib';

export const TokenBalancesUpdater = () => {
  useTokenBalancesByChain();
  return null;
};
