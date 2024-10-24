import React from 'react';

import { MaxUint256 } from '@ethersproject/constants';
import {
  useSwitchNetwork,
  useWeb3ModalProvider,
} from '@web3modal/ethers5/react';
import { BigNumber, ethers, utils } from 'ethers';

import TOKEN from '@/app/abi/token.json';
import { track, AnalyticsEvent } from '@/shared/analytics';
import { useToast } from '@/shared/hooks';
import { depositDexVault } from '@/shared/hooks/vault/depositDexVault';
import { useWeb3ModalAccount } from '@/shared/lib';
import {
  Nullable,
  Token,
  useAddFundActionApiV1VaultsVaultIdActionPost,
  Vault,
} from '@/shared/types';
import { ToastType } from '@/shared/ui';
import {
  formatUserMoney,
  increaseGasLimit,
  VaultCurrency,
} from '@/shared/utils';

export const useDeposit = (
  currency: VaultCurrency,
  vaultContract: Nullable<Vault>,
  tokenAddress: string,
  vaultId: number,
  chainId: number,
  fundType: string,
) => {
  const { triggerToast } = useToast();
  const [isLoading, setIsLoading] = React.useState(false);
  const [buttonMessage, setButtonMessage] = React.useState<string | null>(null);
  const { address, isConnected } = useWeb3ModalAccount();

  const { mutate } = useAddFundActionApiV1VaultsVaultIdActionPost();
  const { switchNetwork } = useSwitchNetwork();
  const { walletProvider } = useWeb3ModalProvider();

  const deposit = React.useCallback(
    async (amount: string) => {
      const vaultAddress = vaultContract?.address;

      if (
        !tokenAddress ||
        !vaultAddress ||
        !vaultContract ||
        !isConnected ||
        !address
      ) {
        triggerToast({
          message: `Something went wrong`,
          description:
            'We were unable to complete the current operation. Try again or connect feedback.',
          type: ToastType.Error,
        });
        return;
      }

      try {
        setIsLoading(true);

        if (!walletProvider) {
          throw new Error('Wallet provider is not available');
        }

        setButtonMessage('Switching network...');
        await switchNetwork(chainId);

        const provider = new ethers.providers.Web3Provider(walletProvider);
        const signer = provider.getSigner();

        const tokenContract = new ethers.Contract(
          tokenAddress,
          TOKEN,
          signer,
        ) as Token;

        const decimals = await tokenContract.decimals();
        const symbol = await tokenContract.symbol();
        const weiAmount = utils.parseUnits(amount, decimals);

        let hash = '';
        if (fundType === 'dex') {
          const depositTx = await depositDexVault({
            walletAddress: address,
            amount: weiAmount,
            vaultAddress,
            signer,
            tokenAddress: tokenContract.address,
            onStartApprove: () => setButtonMessage('Approving...'),
            onStartDeposit: () => setButtonMessage('Depositing...'),
          });

          hash = depositTx.hash;
        } else {
          const vault = new ethers.Contract(
            vaultAddress,
            vaultContract.interface,
            signer,
          );

          const allowance = (await tokenContract.allowance(
            address,
            vaultAddress,
          )) as BigNumber;

          if (allowance.lt(weiAmount)) {
            setButtonMessage('Approving...');
            const approveTx = await tokenContract.approve(
              vaultAddress,
              MaxUint256,
            );
            await approveTx.wait();
          }

          const depositEstimatedGas = await vault.estimateGas.deposit(
            weiAmount,
            address,
          );
          const gasLimit = increaseGasLimit(depositEstimatedGas, 1.2);

          setButtonMessage('Depositing...');
          const depositTx = await vault.deposit(weiAmount, address, {
            gasLimit,
          });
          await depositTx.wait();

          hash = depositTx.hash;
        }

        mutate({
          vaultId,
          data: { tx_hash: hash, address, action: 'deposit' },
        });
        track.event(AnalyticsEvent.DepositSuccess, {
          walletAddress: address,
          amount: Number(amount),
          currency,
          contractAddress: vaultAddress,
        });

        triggerToast({
          message: `${formatUserMoney(amount)} ${symbol} deposited`,
          description:
            'Check your updated Vault Balance or explore the contract.',
        });
      } catch (error: unknown) {
        console.error('error deposit: ', error);

        track.event(AnalyticsEvent.DepositError, {
          walletAddress: address,
          amount: Number(amount),
          currency,
          contractAddress: vaultAddress,
          message: JSON.stringify(error),
        });

        triggerToast({
          message: `Something went wrong`,
          description:
            'We were unable to complete the current operation. Try again or connect feedback.',
          type: ToastType.Error,
        });
      } finally {
        setIsLoading(false);
        setButtonMessage(null);
      }
    },
    [
      vaultContract,
      tokenAddress,
      isConnected,
      address,
      triggerToast,
      mutate,
      vaultId,
      currency,
    ],
  );

  return { deposit, isLoading, buttonMessage, setButtonMessage };
};
