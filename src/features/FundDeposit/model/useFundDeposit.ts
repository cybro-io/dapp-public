import React from 'react';

import { useFlag } from '@unleash/proxy-client-react';
import { BigNumberish, ethers } from 'ethers';
import { useCookies } from 'react-cookie';

import { appKit } from '@/app/providers';
import {
  depositDexVault,
  depositErc4626Vault,
  depositVersion_2025_02Vault,
  depositOneClickVault,
  SelectedTokenCrypto,
} from '@/entities/fund';
import { AnalyticsEvent, track } from '@/shared/analytics';
import {
  createTokenContract,
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

import { FundDepositState } from '../lib/types';

export const useFundDeposit = () => {
  const { triggerToast } = useToast();
  const isEnabledTiers = useFlag(Flag.tiers);

  const [cookies] = useCookies(['utm_params']);
  const { address } = useAppKitAccount();

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
    onSuccessDeposit,
    onErrorDeposit,
    depositAddress,
    defaultToken,
  }: {
    vaultAddress: string;
    tokenAddress: string;
    amount: BigNumberish;
    fundType: FundType;
    chainId: number;
    onStartDeposit?: () => void;
    onSuccessDeposit?: () => void;
    onErrorDeposit?: (reason: string) => void;
    depositAddress: string;
    defaultToken?: SelectedTokenCrypto;
  }) => {
    try {
      setDepositState(FundDepositState.PREPARE);
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
        throw new Error(
          `Please switch to the correct network ${chainId} != ${currentChain}`,
        );
      }

      // Contracts
      const vaultContract = createVaultContract(vaultAddress, fundType, signer);
      const tokenContract = createTokenContract(tokenAddress, signer);

      const tokenDecimals = await tokenContract.decimals();

      const depositFunctions = {
        [FundType.dex]: depositDexVault,
        [FundType.oneClick]: depositOneClickVault,
        [FundType.erc4626]: depositErc4626Vault,
        [FundType.version2025_02]: depositVersion_2025_02Vault,
        [FundType.version2025_04]: depositVersion_2025_02Vault,
      };

      const depositFunc = depositFunctions[fundType];

      await depositFunc({
        vaultContract: vaultContract as Vault &
          VaultDex &
          VaultOneClick &
          VaultVersion_2025_02,
        tokenContract,
        amount: ethers.utils.parseUnits(amount.toString(), tokenDecimals),
        walletAddress: depositAddress,
        onStartApprove: () => setDepositState(FundDepositState.APPROVE),
        onStartDeposit: () => {
          onStartDeposit?.();
          setDepositState(FundDepositState.DEPOSIT);
        },
        isEnabledTiers,
      });

      const tokenSymbol = await tokenContract.symbol();

      track.event(AnalyticsEvent.DepositSuccess, {
        fromWallet: address,
        walletAddress: depositAddress,
        amount,
        currency: tokenSymbol,
        contractAddress: vaultAddress,
        utm: JSON.stringify(cookies.utm_params),

        initialToken: defaultToken?.address,
        initialChain: defaultToken?.chain.id,
        selectedToken: tokenAddress,
        selectedChain: chainId,
      });

      triggerToast({
        message: `${formatUserMoney(amount.toString())} ${tokenSymbol} deposited`,
        description:
          'Check your updated Vault Balance or explore the contract.',
      });

      onSuccessDeposit?.();
    } catch (error) {
      console.log(error);
      onErrorDeposit?.('Deposit Error');

      track.event(
        isErrorUserRejected(error)
          ? AnalyticsEvent.DepositReject
          : AnalyticsEvent.DepositError,
        {
          fromWallet: address,
          walletAddress: depositAddress,
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
