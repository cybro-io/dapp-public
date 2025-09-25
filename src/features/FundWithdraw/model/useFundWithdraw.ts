import React from 'react';

import { useFlag } from '@unleash/proxy-client-react';
import { BigNumberish, ethers } from 'ethers';

import { appKit } from '@/app/providers';
import {
  withdrawDexVault,
  withdrawErc4626Vault,
  withdrawOneClickVault,
  withdrawVersion_2025_02,
} from '@/entities/fund';
import { AnalyticsEvent, track } from '@/shared/analytics';
import {
  createVaultContract,
  isErrorUserRejected,
  useToast,
  useAppKitAccount,
  Flag,
} from '@/shared/lib';
import {
  FundType,
  Vault,
  VaultDex,
  VaultOneClick,
  VaultVersion_2025_02,
} from '@/shared/types';
import { ToastType } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import { FundWithdrawState } from '../lib/types';

export const useFundWithdraw = () => {
  const { triggerToast } = useToast();
  const isEnabledTiers = useFlag(Flag.tiers);

  const { address } = useAppKitAccount();

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

      const walletProvider = appKit.getWalletProvider();
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

      const withdrawFunctions = {
        [FundType.dex]: withdrawDexVault,
        [FundType.oneClick]: withdrawOneClickVault,
        [FundType.erc4626]: withdrawErc4626Vault,
        [FundType.version2025_02]: withdrawVersion_2025_02,
        [FundType.version2025_04]: withdrawVersion_2025_02,
      };

      const withdrawFunc = withdrawFunctions[fundType];

      setWithdrawState(FundWithdrawState.REDEEM);
      await withdrawFunc({
        vaultContract: vaultContract as Vault &
          VaultDex &
          VaultOneClick &
          VaultVersion_2025_02,
        amount: ethers.utils.parseUnits(amount.toString(), decimals),
        walletAddress: address,
        tokenAddress,
        isEnabledTiers,
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
