import React, { memo } from 'react';

import { FundSubmitButton } from '@/entities/fund';
import { useFundDepositContext } from '@/features/FundDeposit';

export const FundDepositButton = memo(() => {
  const {
    submitButtonText,
    handleDeposit,
    isSelectedDefaultToken,
    isDisabledSubmit,
  } = useFundDepositContext();

  const text = isSelectedDefaultToken ? 'Deposit' : 'Auto-convert & Deposit';

  return (
    <FundSubmitButton onClick={handleDeposit} isDisabled={isDisabledSubmit}>
      {submitButtonText ?? text}
    </FundSubmitButton>
  );
});
