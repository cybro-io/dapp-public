import React, { useMemo } from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { Skeleton } from '@heroui/react';
import { useFlag } from '@unleash/proxy-client-react';
import BigNumberJs from 'bignumber.js';
import clsx from 'clsx';

import { useCurrentTier } from '@/entities/Staking';
import { useStakeContext } from '@/features/Stake';
import { Flag } from '@/shared/lib';
import { Group, Stack, Text, TextView, Typography } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';
import Cybro14Icon from '@assets/assets/cybro-14.svg';
import LockedCybro14Icon from '@assets/assets/locked-cybro-14.svg';
import ClockIcon from '@assets/icons/clock.svg';

interface StakeRewardProps extends React.PropsWithChildren {}

export const StakeReward = ({ children }: StakeRewardProps) => {
  const { period, rewards, isLockedCybro, form } = useStakeContext();

  const { amount } = form.values;
  const { stakedAmount, nextTier, getTierByAmount, needStakeForNextTier } =
    useCurrentTier();

  const nextAmountBN = new BigNumberJs(needStakeForNextTier).minus(amount || 0);

  const reachTier = useMemo(() => {
    const totalAmount = new BigNumberJs(amount || 0)
      .plus(stakedAmount ?? 0)
      .toNumber();

    return getTierByAmount(totalAmount);
  }, [amount, stakedAmount, getTierByAmount]);

  const handleOpenTiersModal = () => {
    NiceModal.show('tiersModal');
  };

  const isEnabledTiers = useFlag(Flag.tiers);

  return (
    <Stack className="w-full px-1 pb-1 pt-4 gap-4 bg-button-secondary-defaultBg rounded-2xl">
      <Stack className="gap-2 px-1">
        <Stack>
          <Text textView={TextView.C4} className="!text-white/60">
            Your total reward:
          </Text>

          <Group className="gap-2 items-center">
            {isLockedCybro ? <LockedCybro14Icon /> : <Cybro14Icon />}
            <Skeleton
              isLoaded={true}
              className="rounded-lg dark:bg-background-tableRow"
            >
              <Text textView={TextView.BP1}>+ {formatUserMoney(rewards)}</Text>
            </Skeleton>
            {/*<Skeleton todo: in next release*/}
            {/*  isLoaded={true}*/}
            {/*  className="rounded-lg dark:bg-background-tableRow"*/}
            {/*>*/}
            {/*  <Text textView={TextView.C2} className="!text-white/60">*/}
            {/*    ≈ ${formatMoney(rewardsUsd)}*/}
            {/*  </Text>*/}
            {/*</Skeleton>*/}
          </Group>
        </Stack>
        <Group className="gap-2">
          <ClockIcon />
          <Text textView={TextView.C4} className="!text-white/80">
            After {period?.months} months
          </Text>
        </Group>
      </Stack>

      {isEnabledTiers && nextTier && (
        <button
          className={clsx(
            'px-2 py-1 rounded-md backdrop-blur-[3px] inline-flex w-fit',
            nextAmountBN.isGreaterThan(0)
              ? 'bg-text-accent-yellow/30'
              : 'bg-trustScore-green-100/30',
          )}
          onClick={handleOpenTiersModal}
        >
          {nextAmountBN.isGreaterThan(0) ? (
            <Typography order={3} className="text-text-accent-yellow">
              Tier {nextTier.index} requires +{nextAmountBN.dp(4).toFixed()}{' '}
              CYBRO
            </Typography>
          ) : (
            <Typography order={3} className="text-trustScore-green-100">
              You will reach Tier {reachTier}
            </Typography>
          )}
        </button>
      )}

      {children}
    </Stack>
  );
};
