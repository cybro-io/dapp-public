import React from 'react';

import { FundDepositContext } from './FundDepositContext';

export const useFundDepositContext = () => {
  const context = React.useContext(FundDepositContext);

  if (!context) {
    throw new Error(
      'useFundDepositContext must be used within a FundDepositProvider',
    );
  }
  return context;
};
