import React, { memo } from 'react';

import { FundSubmitButton } from '@/entities/fund';
import { useFundWithdrawContext } from '@/features/FundWithdraw';

export const FundWithdrawButton = memo(() => {
  const { submitButtonText, handleWithdraw, isDisabledSubmit } =
    useFundWithdrawContext();

  return (
    <FundSubmitButton onClick={handleWithdraw} isDisabled={isDisabledSubmit}>
      {submitButtonText ?? 'Withdraw'}
    </FundSubmitButton>
  );
});
