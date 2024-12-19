import React from 'react';

import { FundWithdrawContext } from './FundWithdrawContext';

export const useFundWithdrawContext = () => {
  const context = React.useContext(FundWithdrawContext);

  if (!context) {
    throw new Error(
      'useFundWithdrawContext must be used within a FundWithdrawProvider',
    );
  }
  return context;
};
