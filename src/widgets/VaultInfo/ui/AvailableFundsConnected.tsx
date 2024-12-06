import React from 'react';

import { zeroAddress } from 'viem';

import { AvailableFunds, AvailableFundsProps } from '@/entities/AvailableFunds';
import { useVault } from '@/features/FundWithdraw';
import { useErc20Balance, useWeb3ModalAccount } from '@/shared/lib';
import { FundType } from '@/shared/types';

interface AvailableFundsConnectedProps
  extends Pick<AvailableFundsProps, 'onButtonClick' | 'tokenIcon'> {
  tokenAddress: string;
  chainId: number;
  vaultAddress: string;
  fundType: FundType;
  className?: string;
}

export const AvailableFundsConnected = ({
  tokenAddress,
  chainId,
  fundType,
  vaultAddress,
  ...props
}: AvailableFundsConnectedProps) => {
  const { address } = useWeb3ModalAccount();
  const { balance, fetchBalance } = useErc20Balance();

  const { fetchBalance: fetchVaultBalance, balance: vaultBalance } = useVault(
    vaultAddress,
    chainId,
    fundType,
  );

  React.useEffect(() => {
    if (address) {
      fetchBalance(address, chainId, tokenAddress || zeroAddress);
      fetchVaultBalance(address);
    }
  }, [tokenAddress, address]);

  if (!address) {
    return null;
  }

  return (
    <AvailableFunds
      balance={Number(balance)}
      deposit={Number(vaultBalance)}
      {...props}
    />
  );
};
