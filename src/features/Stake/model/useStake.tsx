import React, { useMemo } from 'react';

import { getChainById } from '@lifi/data-types';
import { useAppKitNetwork } from '@reown/appkit/react';
import { useQueryClient } from '@tanstack/react-query';
import { BigNumber } from 'bignumber.js';

import { useStakedReport } from '@/entities/Staking';
import { AnalyticsEvent, track } from '@/shared/analytics';
import {
  getChain,
  isErrorUserRejected,
  links,
  QueryKey,
  triggerToast,
  useAppKitAccount,
  useGetErc20Balance,
} from '@/shared/lib';
import {
  StakingData,
  StakingResponseDataStakingCybro,
  StakingResponseDataToken,
} from '@/shared/types';
import { ToastType } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import { useStakeForm } from './useStakeForm';
import { useStakeToken } from './useStakeToken';

export interface UseStakeProps {
  isLockedCybro: boolean;
  tokenData: StakingResponseDataToken;
  stakingData: StakingResponseDataStakingCybro;
}

export const useStake = ({
  isLockedCybro,
  stakingData,
  tokenData,
}: UseStakeProps) => {
  const queryClient = useQueryClient();
  const { switchNetwork, chainId } = useAppKitNetwork();
  const { address } = useAppKitAccount();

  const [period, setPeriod] = React.useState<StakingData | null>(null);
  const [isConfirmation, setIsConfirmationConfirmation] = React.useState(false);

  const { stakeTokenMutation, isPending: isPendingStakeToken } =
    useStakeToken();

  const form = useStakeForm(() => {
    if (isInvalidParams) {
      return;
    }

    setIsConfirmationConfirmation(true);
  });

  const selectedChainId = form.values.chainId;

  const stakingDataByChain = stakingData[selectedChainId] ?? [];
  const { report } = useStakedReport({
    stakingData: stakingDataByChain,
    chainId: selectedChainId,
  });

  const tokenAddress =
    (isLockedCybro
      ? tokenData[selectedChainId]?.lockedCybroAddress
      : tokenData[selectedChainId]?.cybroAddress) ?? '';

  const { balance, isLoading: isLoadingBalance } = useGetErc20Balance({
    walletAddress: address,
    chainId: selectedChainId,
    tokenAddress,
  });

  const isInvalidParams = !address || !tokenAddress || !period;

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
          chainId: selectedChainId,
        });

        const chain = getChainById(selectedChainId);

        triggerToast({
          message: `Successfully staked ${formatUserMoney(form.values.amount)} ${isLockedCybro ? 'Locked Cybro' : 'Cybro'} on ${chain.name}`,
          description: 'Check your updated Balance.',
        });

        form.resetForm({ values: { amount: '', chainId: selectedChainId } });

        queryClient.invalidateQueries({
          queryKey: [QueryKey.AvailableRewards],
        });

        queryClient.invalidateQueries({
          queryKey: [QueryKey.StakedReport],
        });

        queryClient.invalidateQueries({
          queryKey: [QueryKey.TotalStaked],
        });

        queryClient.invalidateQueries({
          queryKey: [QueryKey.StakedAmount],
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
    const periods = stakingDataByChain?.sort(
      (stakeA, stakeB) => stakeB.months - stakeA.months,
    );

    setPeriod(periods?.[0] ?? null);
  }, [stakingDataByChain]);

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

  const isNeedChangeChain = chainId !== selectedChainId;
  const isInsufficientBalance = new BigNumber(amountNumber).isGreaterThan(
    balance,
  );
  const isAlreadyStaked =
    !isLockedCybro &&
    new BigNumber(
      report.find((item) => item.address == period?.address)?.report.balance ??
        0,
    ).isGreaterThan(0);

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

    if (isAlreadyStaked) {
      return 'Already staked';
    }

    return null;
  }, [
    isInsufficientBalance,
    isLockedCybro,
    isNeedChangeChain,
    isPendingStakeToken,
    isAlreadyStaked,
  ]);

  const isSubmitDisabled =
    !isNeedChangeChain &&
    (!form.isValid ||
      isInsufficientBalance ||
      !period ||
      isPendingStakeToken ||
      isAlreadyStaked);

  const handleSubmit = () => {
    if (isNeedChangeChain) {
      switchNetwork(getChain(selectedChainId));
      return;
    }

    form.handleSubmit();
  };

  const stakeChains = useMemo(() => {
    const tokensByChain = Object.entries(tokenData);

    return tokensByChain
      .filter(([_chainId, token]) => {
        const tokenAddress = isLockedCybro
          ? token.lockedCybroAddress
          : token.cybroAddress;

        return Boolean(tokenAddress);
      })
      .map(([chainId]) => {
        const chain = getChainById(Number(chainId));

        return {
          isCrypto: true,
          name: chain.name,
          logoUrl: chain.logoURI ?? links.noImage,
          id: chain.id,
        };
      });
  }, [tokenData, isLockedCybro]);

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
    stakingDataByChain,
    selectedChainId,
    stakeChains,
  };
};
