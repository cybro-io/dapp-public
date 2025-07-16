import { BigNumberish } from 'ethers';

import { SelectedTokenCrypto } from '@/entities/fund';

export enum FundWithdrawState {
  NONE = 'none',
  PREPARE = 'prepare',
  REDEEM = 'redeem',
}

export type FundWithdrawContextProps = {
  selectedToken: SelectedTokenCrypto | null;
  selectedTokenId: string;
  setSelectedToken: (token: SelectedTokenCrypto) => void;
  balance: string;
  isLoadingBalance: boolean;
  priceSelectedToken: string | number;
  isLoadingPrice: boolean;

  amount: string;
  amountNumber: number;
  setAmount: (amount: string) => void;

  handleWithdraw: () => void;
  isDisabledSubmit: boolean;
  submitButtonText: string | null;
  isDisabledInput: boolean;

  vaultToken: SelectedTokenCrypto;
  vaultSymbol: string;
  defaultTokenIds: string[];
  sharePrice: string;

  isLoadingVaultTokenPriceUsd: boolean;
  vaultTokenPriceUsd: number;
  receiveAmount: number;
  timer: number;
  isLoadingWithdraw: boolean;
  step: number;
};
