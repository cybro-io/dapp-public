import React from 'react';

import { TokenResponseData, VaultResponseData } from '@/shared/types';

interface FundCalculatorVault extends VaultResponseData {
  tokens: TokenResponseData[];
}

export type FundCalculatorContextProps = {
  vault: FundCalculatorVault;
};

const FundCalculatorContext =
  React.createContext<FundCalculatorContextProps | null>(null);

export const useFundCalculator = () => {
  const context = React.useContext(FundCalculatorContext);

  if (!context) {
    throw new Error(
      'useFundCalculatorContext must be used within a FundDepositProvider',
    );
  }
  return context;
};

interface FundCalculatorProviderProps extends React.PropsWithChildren {
  vault: VaultResponseData;
}

export const FundCalculatorContextProvider = ({
  children,
  vault,
}: FundCalculatorProviderProps) => {
  const vaultValue = {
    ...vault,
    tokens: vault.tokens ? vault.tokens : [vault.token],
  };

  return (
    <FundCalculatorContext.Provider value={{ vault: vaultValue }}>
      {children}
    </FundCalculatorContext.Provider>
  );
};
