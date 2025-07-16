import React from 'react';

import { useAiBroker } from './use-ai-broker';

const AiBrokerContext = React.createContext<ReturnType<
  typeof useAiBroker
> | null>(null);

export const useAiBrokerContext = () => {
  const context = React.useContext(AiBrokerContext);

  if (!context) {
    throw new Error(
      'useAiBrokerContext must be used within AiBrokerContextProvider',
    );
  }
  return context;
};

export const AiBrokerContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const value = useAiBroker();

  return (
    <AiBrokerContext.Provider value={value}>
      {children}
    </AiBrokerContext.Provider>
  );
};
