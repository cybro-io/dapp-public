import React from 'react';

import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { BigNumberish, ethers } from 'ethers';

import {
  withdrawDexVault,
  withdrawErc4626Vault,
  withdrawOneClickVault,
} from '@/entities/fund';
import { AnalyticsEvent, track } from '@/shared/analytics';
import {
  createVaultContract,
  isErrorUserRejected,
  useToast,
  useWeb3ModalAccount,
} from '@/shared/lib';
import { FundType, Vault, VaultDex, VaultOneClick } from '@/shared/types';
import { ToastType } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import { FundWithdrawState } from '../lib/types';

export const useFundWithdraw = () => {
  const { triggerToast } = useToast();

  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const [withdrawState, setWithdrawState] = React.useState<FundWithdrawState>(
    FundWithdrawState.NONE,
  );

  const withdraw = async ({
    fundType,
    chainId,
    amount,
    vaultAddress,
    tokenAddress,
  }: {
    vaultAddress: string;
    tokenAddress: string;
    amount: BigNumberish;
    fundType: FundType;
    chainId: number;
  }) => {
    try {
      setWithdrawState(FundWithdrawState.PREPARE);
      if (!address) {
        throw new Error('Please connect your wallet');
      }

      if (!walletProvider) {
        throw new Error('Wallet provider is not available');
      }

      // Wallet
      const provider = new ethers.providers.Web3Provider(walletProvider);
      const signer = provider.getSigner();

      const currentChain = await signer.getChainId();
      if (chainId !== currentChain) {
        throw new Error('Please switch to the correct network');
      }

      // Contracts
      const vaultContract = createVaultContract(vaultAddress, fundType, signer);
      const decimals = await vaultContract.decimals();
      const symbol = await vaultContract.symbol();

      const withdrawFunc =
        fundType === FundType.dex
          ? withdrawDexVault
          : fundType === FundType.oneClick
            ? withdrawOneClickVault
            : withdrawErc4626Vault;

      setWithdrawState(FundWithdrawState.REDEEM);
      await withdrawFunc({
        vaultContract: vaultContract as Vault & VaultDex & VaultOneClick,
        amount: ethers.utils.parseUnits(amount.toString(), decimals),
        walletAddress: address,
        tokenAddress,
      });

      track.event(AnalyticsEvent.WithdrawalSuccess, {
        walletAddress: address,
        amount: Number(amount),
        tokenAddress,
        contractAddress: vaultAddress,
      });

      triggerToast({
        message: `${formatUserMoney(amount.toString())} ${symbol} withdrawn`,
        description:
          'Check the balance of the wallet connected to the platform.',
      });
    } catch (error) {
      console.log(error);

      track.event(
        isErrorUserRejected(error)
          ? AnalyticsEvent.WithdrawReject
          : AnalyticsEvent.WithdrawalError,
        {
          walletAddress: address,
          amount: Number(amount),
          tokenAddress,
          contractAddress: vaultAddress,
          message: JSON.stringify(error),
        },
      );

      if (!isErrorUserRejected(error)) {
        triggerToast({
          message: `Something went wrong`,
          description:
            'We were unable to complete the current operation. Try again or connect feedback.',
          type: ToastType.Error,
        });
      }
    } finally {
      setWithdrawState(FundWithdrawState.NONE);
    }
  };

  return {
    withdraw,
    isLoading: withdrawState !== FundWithdrawState.NONE,
    withdrawState,
  };
};
