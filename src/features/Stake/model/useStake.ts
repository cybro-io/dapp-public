import React from 'react';

import { ChainId } from '@lifi/sdk';
import { useQueryClient } from '@tanstack/react-query';
import { useSwitchNetwork } from '@web3modal/ethers5/react';
import { BigNumber } from 'bignumber.js';

import { useCybroBalance } from '@/entities/Staking';
import { AnalyticsEvent, track } from '@/shared/analytics';
import { QueryKey } from '@/shared/const';
import {
  isErrorUserRejected,
  triggerToast,
  useWeb3ModalAccount,
} from '@/shared/lib';
import { Maybe, StakingData } from '@/shared/types';
import { ToastType } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import { useStakeForm } from './useStakeForm';
import { useStakeToken } from './useStakeToken';

export interface UseStakeProps {
  isLockedCybro: boolean;
  tokenAddress: Maybe<string>;
  stakingData?: Array<StakingData>;
}

export const useStake = ({
  isLockedCybro,
  stakingData,
  tokenAddress,
}: UseStakeProps) => {
  const queryClient = useQueryClient();
  const { switchNetwork } = useSwitchNetwork();
  const { address, chainId } = useWeb3ModalAccount();

  const [period, setPeriod] = React.useState<StakingData | null>(null);
  const [isConfirmation, setIsConfirmationConfirmation] = React.useState(false);

  const { balance: cybroBalance, isLoadingBalance } = useCybroBalance(address);
  const balance = isLockedCybro ? cybroBalance.locked : cybroBalance.cybro;

  const { stakeTokenMutation, isPending: isPendingStakeToken } =
    useStakeToken();

  const isInvalidParams = !address || !tokenAddress || !period;

  const form = useStakeForm(() => {
    if (isInvalidParams) {
      return;
    }

    setIsConfirmationConfirmation(true);
  });

  const acceptConfirmation = () => {
    if (isInvalidParams) {
      return;
    }

    setIsConfirmationConfirmation(false);
    stakeTokenMutation({
      amount: form.values.amount,
      walletAddress: address,
      tokenAddress,
      stakeAddress: period.address,
    })
      .then(() => {
        track.event(AnalyticsEvent.StakeSuccess, {
          amount: form.values.amount,
          walletAddress: address,
          tokenAddress,
          stakeAddress: period.address,
        });

        triggerToast({
          message: `Successfully staked ${formatUserMoney(form.values.amount)} ${isLockedCybro ? 'Locked Cybro' : 'Cybro'}`,
          description: 'Check your updated Balance.',
        });
        form.handleReset({});

        queryClient.invalidateQueries({
          queryKey: [QueryKey.AvailableRewards],
        });
      })
      .catch((error) => {
        track.event(
          isErrorUserRejected(error)
            ? AnalyticsEvent.StakeReject
            : AnalyticsEvent.StakeError,
          {
            amount: form.values.amount,
            walletAddress: address,
            tokenAddress,
            stakeAddress: period.address,
            message: JSON.stringify(error),
          },
        );

        console.error(error);

        if (!isErrorUserRejected(error)) {
          triggerToast({
            message: `Something went wrong`,
            description:
              'We were unable to complete the current operation. Try again or connect support.',
            type: ToastType.Error,
          });
        }
      });
  };

  const cancelConfirmation = () => {
    setIsConfirmationConfirmation(false);
  };

  const amountNumber = new BigNumber(form.values.amount ?? 0)
    .dp(6, BigNumber.ROUND_DOWN)
    .toNumber();

  // Update default stake period
  React.useEffect(() => {
    const periods = stakingData?.sort(
      (stakeA, stakeB) => stakeB.months - stakeA.months,
    );

    setPeriod(periods?.[0] ?? null);
  }, [stakingData]);

  const rewards = React.useMemo(() => {
    const amountBN = new BigNumber(form.values.amount);

    if (!period || amountBN.isNaN() || amountBN.isZero()) {
      return 0;
    }

    return amountBN
      .multipliedBy(period.months / 12)
      .multipliedBy(period.percent / 100)
      .toNumber();
  }, [period, form.values.amount]);

  const isNeedChangeChain = chainId !== ChainId.BLS;
  const isInsufficientBalance = amountNumber > balance;

  const submitText = React.useMemo(() => {
    if (isPendingStakeToken) {
      return `Staking ${isLockedCybro ? 'LCYBRO' : 'CYBRO'}...`;
    }

    if (isNeedChangeChain) {
      return 'Switch network';
    }

    if (isInsufficientBalance) {
      return 'Insufficient balance';
    }

    return null;
  }, [
    isInsufficientBalance,
    isLockedCybro,
    isNeedChangeChain,
    isPendingStakeToken,
  ]);

  const isSubmitDisabled =
    !isNeedChangeChain &&
    (!form.isValid || isInsufficientBalance || !period || isPendingStakeToken);

  const handleSubmit = () => {
    if (isNeedChangeChain) {
      switchNetwork(ChainId.BLS).then();
      return;
    }

    form.handleSubmit();
  };

  return {
    period,
    setPeriod,
    form,
    rewards,
    balance,
    isLoadingLockedBalance: isLoadingBalance,
    submitText,
    isSubmitDisabled,
    handleSubmit,
    isPendingStakeToken,
    acceptConfirmation,
    cancelConfirmation,
    isConfirmation,
    isLockedCybro,
    tokenAddress,
    stakingData,
  };
};
