'use client';
import { createContext, useContext } from 'react';

import { useExchange } from './useExchange';

const ExchangeContext = createContext<ReturnType<typeof useExchange> | null>(
  null,
);

export const ExchangeProvider = ({ children }: React.PropsWithChildren) => {
  const value = useExchange();

  return (
    <ExchangeContext.Provider value={value}>
      {children}
    </ExchangeContext.Provider>
  );
};

export const useExchangeContext = () => {
  const context = useContext(ExchangeContext);

  if (!context) {
    throw new Error('Context must be used within a ExchangeProvider');
  }

  return context;
};
