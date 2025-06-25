import React from 'react';

import { useStake, UseStakeProps } from './useStake';

const StakeContext = React.createContext<ReturnType<typeof useStake> | null>(
  null,
);

export const StakeContextProvider = ({
  children,
  ...stakeProps
}: React.PropsWithChildren & UseStakeProps) => {
  const value = useStake(stakeProps);

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
