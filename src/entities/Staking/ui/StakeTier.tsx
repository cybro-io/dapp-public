import React from 'react';

import clsx from 'clsx';

import { Group, Stack, Title, Typography } from '@/shared/ui';

import { IStakeTier } from '../libs/constants';

interface StakeTierProps {
  tier: IStakeTier;
  isActive?: boolean;
}

export const StakeTier = ({ tier, isActive = false }: StakeTierProps) => {
  return (
    <Stack
      data-active={isActive}
      className="relative p-[10px_14px_14px_14px] w-full max-w-[320px] rounded-[14px] gap-[5px] data-[active=true]:outline-trustScore-green-100 outline-1 outline outline-transparent"
      style={{ background: tier.bg }}
    >
      {isActive && (
        <Group className="absolute backdrop-blur-[3px] right-[-5.5px] bottom-[-8px] rotate-[-5deg] bg-trustScore-green-100/30 w-fit h-[22px] px-2 py-1 rounded-[6px]">
          <Typography order={3} className="text-trustScore-green-100">
            You&#39;re here
          </Typography>
        </Group>
      )}

      <Group className="items-center justify-between">
        <Group className="gap-1.5 items-center">
          {tier.icon}
          <Title order={4}>{tier.name}</Title>
        </Group>

        <Typography
          uppercase
          variant="caption"
          order={3}
          className="text-white/50"
        >
          Tier {tier.index}
        </Typography>
      </Group>

      {tier.shouldStake ? (
        <Group className="gap-1 items-center">
          <Typography variant="poppins" order={2} className="text-white/60">
            Stake&nbsp;
            <span className="text-white">{tier.shouldStake} CYBRO</span>
          </Typography>
          {/*<Typography variant="caption" order={4} className="text-white/60">*/}
          {/*  ~${tier.shouldStakeUsd}*/}
          {/*</Typography>*/}
        </Group>
      ) : (
        <Typography variant="poppins" order={2} className="text-white/60">
          No staking required
        </Typography>
      )}

      <Group
        className={clsx('px-2 py-1 rounded-[6px] w-fit', tier.textClass)}
        style={{ background: tier.textBg }}
      >
        <Typography order={3}>
          {tier.feeDiscountPercent
            ? `${tier.feeDiscountPercent}% fee discount`
            : 'No fee discount'}
        </Typography>
      </Group>
    </Stack>
  );
};
