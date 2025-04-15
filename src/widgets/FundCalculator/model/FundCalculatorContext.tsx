import React from 'react';

import { SelectedToken } from '@/entities/fund';
import { SingleVaultResponseData, TokenResponseData } from '@/shared/types';

interface FundCalculatorVault
  extends Pick<
    SingleVaultResponseData,
    | 'address'
    | 'is_deposit_disabled'
    | 'id'
    | 'chain'
    | 'chain_id'
    | 'apy'
    | 'fund_type'
  > {
  tokens: TokenResponseData[];
}

export type FundCalculatorContextProps = {
  vault: FundCalculatorVault;
  defaultSelectedToken?: SelectedToken;
  defaultAddress?: string;
};

export const FundCalculatorContext =
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
  vault: SingleVaultResponseData;
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
