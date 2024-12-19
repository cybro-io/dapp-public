import { PeriodTab, SelectedToken, SelectedTokenCrypto } from '@/entities/fund';

export enum FundDepositState {
  NONE = 'none',
  PREPARE = 'prepare',
  APPROVE = 'approve',
  DEPOSIT = 'deposit',
}

export type FundDepositContextProps = {
  defaultToken: SelectedTokenCrypto;
  selectedToken: SelectedToken;
  selectedTokenId: string;
  setSelectedToken: (token: SelectedToken) => void;
  isSelectedDefaultToken: boolean;
  balance: string;
  isLoadingBalance: boolean;
  price: number;
  priceDefaultToken: number;
  isLoadingPrice: boolean;
  isLoadingDefaultTokenPrice: boolean;

  amount: string;
  amountNumber: number;
  setAmount: (amount: string) => void;

  period: PeriodTab;
  setPeriod: (period: PeriodTab) => void;
  periodApy: number;

  profit: number;
  profitUsd: number;
  handleDeposit: () => void;
  isDisabledSubmit: boolean;
  submitButtonText: string | null;
  isDisabledInput: boolean;

  isLoadingCalculate: boolean;
  receivedAmount: number;
  isProcessing: boolean;

  step: number;
  withZapInDeposit: boolean;
};
