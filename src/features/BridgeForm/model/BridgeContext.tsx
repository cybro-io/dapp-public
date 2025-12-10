import React from 'react';

import { useBridge } from './useBridge';

const BridgeContext = React.createContext<ReturnType<typeof useBridge> | null>(
  null,
);

export const BridgeContextProvider = ({
  children,
}: React.PropsWithChildren) => {
  const value = useBridge();

  return (
    <BridgeContext.Provider value={value}>{children}</BridgeContext.Provider>
  );
};

export const useBridgeContext = () => {
  const context = React.useContext(BridgeContext);

  if (!context) {
    throw new Error(
      'useBridgeContext must be used within a BridgeContextProvider',
    );
  }

  return context;
};
