import React, { memo } from 'react';

import { FundPeriod } from '@/entities/fund';
import { useFundDepositContext } from '@/features/FundDeposit';

export const FundDepositPeriod = memo(() => {
  const { period, setPeriod } = useFundDepositContext();
  return <FundPeriod value={period} onChange={setPeriod} />;
});
