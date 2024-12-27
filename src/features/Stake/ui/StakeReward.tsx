import React from 'react';

import { Skeleton } from '@nextui-org/react';

import { useStakeContext } from '@/features/Stake';
import { Group, Stack, Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';
import Cybro14Icon from '@assets/assets/cybro-14.svg';
import LockedCybro14Icon from '@assets/assets/locked-cybro-14.svg';
import ClockIcon from '@assets/icons/clock.svg';

interface StakeRewardProps extends React.PropsWithChildren {}

export const StakeReward = ({ children }: StakeRewardProps) => {
  const { period, rewards, isLockedCybro } = useStakeContext();

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

      {children}
    </Stack>
  );
};
