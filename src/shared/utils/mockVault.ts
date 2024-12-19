import { Money, Nullable } from '@/shared/types';

export enum VaultCurrency {
  USDB = 'USDB',
  WETH = 'WETH',
  WBTC = 'WBTC',
}

export type VaultData = {
  title: string;
  userBalance: Nullable<string>;
  userDeposit: Nullable<string>;
  totalValueLocked: Nullable<string>;
  totalVaultInvestment: Nullable<string>;
};

export const getRandomVault = (): VaultCurrency => {
  const values = Object.values(VaultCurrency);
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
};

export const getUserBalanceForVault = (
  currency: VaultCurrency,
  usdbBalance: Money,
  wethBalance: Money,
  wbtcBalance: Money,
): Money => {
  switch (currency) {
    case VaultCurrency.USDB:
      return usdbBalance;
    case VaultCurrency.WETH:
      return wethBalance;
    case VaultCurrency.WBTC:
      return wbtcBalance;
    default:
      return usdbBalance;
  }
};
