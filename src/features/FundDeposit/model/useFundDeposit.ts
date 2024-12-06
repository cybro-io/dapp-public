import React from 'react';

import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { BigNumberish, ethers } from 'ethers';

import { depositDexVault, depositErc4626Vault } from '@/entities/fund';
import { depositOneClickVault } from '@/entities/fund/model/depositOneClickVault';
import { track, AnalyticsEvent } from '@/shared/analytics';
import { useToast } from '@/shared/lib';
import {
  createTokenContract,
  createVaultContract,
  useWeb3ModalAccount,
} from '@/shared/lib';
import {
  FundType,
  useAddFundActionApiV1VaultsVaultIdActionPost,
  Vault,
  VaultDex,
  VaultOneClick,
} from '@/shared/types';
import { ToastType } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import { FundDepositState } from '../lib/types';

export const useFundDeposit = () => {
  const { triggerToast } = useToast();

  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const { mutate } = useAddFundActionApiV1VaultsVaultIdActionPost();

  const [depositState, setDepositState] = React.useState<FundDepositState>(
    FundDepositState.NONE,
  );

  const deposit = async ({
    fundType,
    chainId,
    amount,
    vaultId,
    vaultAddress,
    tokenAddress,
    onStartDeposit,
  }: {
    vaultAddress: string;
    tokenAddress: string;
    amount: BigNumberish;
    fundType: FundType;
    chainId: number;
    vaultId: number;
    onStartDeposit?: () => void;
  }) => {
    try {
      setDepositState(FundDepositState.PREPARE);
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
      const tokenContract = createTokenContract(tokenAddress, signer);

      const tokenDecimals = await tokenContract.decimals();

      const depositFunc =
        fundType === FundType.dex
          ? depositDexVault
          : fundType === FundType.oneClick
            ? depositOneClickVault
            : depositErc4626Vault;

      const tx = await depositFunc({
        vaultContract: vaultContract as Vault & VaultDex & VaultOneClick,
        tokenContract,
        amount: ethers.utils.parseUnits(amount.toString(), tokenDecimals),
        walletAddress: address,
        onStartApprove: () => setDepositState(FundDepositState.APPROVE),
        onStartDeposit: () => {
          onStartDeposit?.();
          setDepositState(FundDepositState.DEPOSIT);
        },
      });

      const tokenSymbol = await tokenContract.symbol();

      mutate({
        vaultId,
        data: { tx_hash: tx.hash, address, action: 'deposit' },
      });

      track.event(AnalyticsEvent.DepositSuccess, {
        walletAddress: address,
        amount,
        currency: tokenSymbol,
        contractAddress: vaultAddress,
      });

      triggerToast({
        message: `${formatUserMoney(amount.toString())} ${tokenSymbol} deposited`,
        description:
          'Check your updated Vault Balance or explore the contract.',
      });
    } catch (error) {
      const Error = error as Error;
      console.log(error);

      track.event(AnalyticsEvent.DepositError, {
        walletAddress: address,
        amount: Number(amount),
        tokenAddress: tokenAddress,
        contractAddress: vaultAddress,
        message: JSON.stringify(error),
      });

      if (!Error?.message.includes('user rejected transaction')) {
        triggerToast({
          message: `Something went wrong`,
          description:
            'We were unable to complete the current operation. Try again or connect feedback.',
          type: ToastType.Error,
        });
      }
    } finally {
      setDepositState(FundDepositState.NONE);
    }
  };

  return {
    deposit,
    isLoading: depositState !== FundDepositState.NONE,
    depositState,
  };
};
