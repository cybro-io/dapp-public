import React from 'react';

import { ChainId } from '@lifi/sdk';
import { useSwitchNetwork } from '@web3modal/ethers5/react';
import { BigNumber } from 'bignumber.js';

import { useCybroBalance, useStakingConfig } from '@/entities/Staking';
import { triggerToast, useWeb3ModalAccount } from '@/shared/lib';
import { StakingData } from '@/shared/types';
import { ToastType } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import { useStakeForm } from './useStakeForm';
import { useStakeToken } from './useStakeToken';

export const useStake = () => {
  const { switchNetwork } = useSwitchNetwork();
  const { address, chainId } = useWeb3ModalAccount();

  const [period, setPeriod] = React.useState<StakingData | null>(null);
  const [isConfirmation, setIsConfirmationConfirmation] = React.useState(false);

  const { balance, isLoadingBalance } = useCybroBalance(address);

  const { stakeTokenMutation, isPending: isPendingStakeToken } =
    useStakeToken();

  const config = useStakingConfig();

  const lockedAddress = config.config?.token.locked;

  const isInvalidParams = !address || !lockedAddress || !period;

  const form = useStakeForm(async ({ amount }) => {
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
      tokenAddress: lockedAddress,
      stakeAddress: period.address,
    })
      .then(() => {
        triggerToast({
          message: `Successfully stacked ${formatUserMoney(form.values.amount)} Locked CYBRO`,
          description: 'Check your updated Balance.',
        });
      })
      .catch(() => {
        triggerToast({
          message: `Something went wrong`,
          description:
            'We were unable to complete the current operation. Try again or connect support.',
          type: ToastType.Error,
        });
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
    const periods = config.config?.staking.sort(
      (stakeA, stakeB) => stakeB.months - stakeA.months,
    );

    setPeriod(periods?.[0] ?? null);
  }, [config.config]);

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
  const isInsufficientBalance = amountNumber > balance.locked;

  const submitText = React.useMemo(() => {
    if (isPendingStakeToken) {
      return 'Staking...';
    }

    if (isNeedChangeChain) {
      return 'Switch network';
    }

    if (isInsufficientBalance) {
      return 'Insufficient balance';
    }

    return null;
  }, [isInsufficientBalance, isNeedChangeChain, isPendingStakeToken]);

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
    config,
    rewards,
    lockedBalance: balance.locked,
    isLoadingLockedBalance: isLoadingBalance,
    submitText,
    isSubmitDisabled,
    handleSubmit,
    isPendingStakeToken,
    acceptConfirmation,
    cancelConfirmation,
    isConfirmation,
  };
};
