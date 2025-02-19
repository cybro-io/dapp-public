import React from 'react';

import { useWeb3ModalProvider } from '@web3modal/ethers5/react';
import { BigNumberish, ethers } from 'ethers';
import { useCookies } from 'react-cookie';

import { depositDexVault, depositErc4626Vault } from '@/entities/fund';
import { depositOneClickVault } from '@/entities/fund/model/depositOneClickVault';
import { AnalyticsEvent, track } from '@/shared/analytics';
import {
  createTokenContract,
  createVaultContract,
  isErrorUserRejected,
  useToast,
  useWeb3ModalAccount,
} from '@/shared/lib';
import { FundType, Vault, VaultDex, VaultOneClick } from '@/shared/types';
import { ToastType } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import { FundDepositState } from '../lib/types';

export const useFundDeposit = () => {
  const { triggerToast } = useToast();

  const [cookies] = useCookies(['utm_params']);
  const { walletProvider } = useWeb3ModalProvider();
  const { address } = useWeb3ModalAccount();

  const [depositState, setDepositState] = React.useState<FundDepositState>(
    FundDepositState.NONE,
  );

  const deposit = async ({
    fundType,
    chainId,
    amount,
    vaultAddress,
    tokenAddress,
    onStartDeposit,
  }: {
    vaultAddress: string;
    tokenAddress: string;
    amount: BigNumberish;
    fundType: FundType;
    chainId: number;
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

      await depositFunc({
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

      track.event(AnalyticsEvent.DepositSuccess, {
        walletAddress: address,
        amount,
        currency: tokenSymbol,
        contractAddress: vaultAddress,
        utm: JSON.stringify(cookies.utm_params),
      });

      triggerToast({
        message: `${formatUserMoney(amount.toString())} ${tokenSymbol} deposited`,
        description:
          'Check your updated Vault Balance or explore the contract.',
      });
    } catch (error) {
      console.log(error);

      track.event(
        isErrorUserRejected(error)
          ? AnalyticsEvent.DepositReject
          : AnalyticsEvent.DepositError,
        {
          walletAddress: address,
          amount: Number(amount),
          tokenAddress: tokenAddress,
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
      setDepositState(FundDepositState.NONE);
    }
  };

  return {
    deposit,
    isLoading: depositState !== FundDepositState.NONE,
    depositState,
  };
};
