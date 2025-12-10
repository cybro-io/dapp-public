import React, { Key } from 'react';

import { GetTransactionsApiV1ExchangeAddressTransactionsGetType } from '@/shared/types';

import { RampTransactionHistory } from '../ui/RampTransactionHistory';
import { SwapTransactionHistory } from '../ui/SwapTransactionHistory';

export const useExchangeTransactionHistory = () => {
  const tabs = [
    { name: 'Swap', Component: SwapTransactionHistory },
    // { name: 'Exchange', Component: RampTransactionHistory },
  ];

  const [type, setType] =
    React.useState<GetTransactionsApiV1ExchangeAddressTransactionsGetType>(
      'Swap',
    );

  const registerTabs = () => ({
    selectedKey: type,
    onSelectionChange: (key: Key) =>
      setType(key as GetTransactionsApiV1ExchangeAddressTransactionsGetType),
  });

  return { registerTabs, tabs };
};
