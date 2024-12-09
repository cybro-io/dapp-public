import React from 'react';

import { useStake } from './useStake';

const StakeContext = React.createContext<ReturnType<typeof useStake> | null>(
  null,
);

export const StakeContextProvider = ({ children }: React.PropsWithChildren) => {
  const value = useStake();

  return (
    <StakeContext.Provider value={value}>{children}</StakeContext.Provider>
  );
};

export const useStakeContext = () => {
  const context = React.useContext(StakeContext);

  if (!context) {
    throw new Error(
      'useStakeContext must be used within a StakeContextProvider',
    );
  }

  return context;
};
