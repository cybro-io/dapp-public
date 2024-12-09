import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { Stake } from '@/features/Stake';
import { links } from '@/shared/lib';
import { Stack, Title, Typography } from '@/shared/ui';
import { StakedReports } from '@/widgets/Staking/ui/StakedReports';
import { TotalStaked } from '@/widgets/Staking/ui/TotalStaked';
import PessimisticCertIcon from '@assets/icons/certic3.svg';

import classNames from './Staking.module.scss';
import { StakingBalances } from './StakingBalances';

export const StakeToken = () => {
  return (
    <Stack
      className={clsx(
        'relative lg:flex-row z-0 gap-10 lg:gap-[65px] w-full lg:w-[936px] h-full bg-transparent lg:bg-background-card rounded-[30px] px-5 lg:px-[52px] py-0 lg:py-[46px] items-center lg:items-start',
        classNames.stakeBg,
      )}
    >
      <Stack className="z-10 flex-1 max-w-[392px] gap-[30px] lg:gap-6">
        <Stack className="gap-2.5 lg:gap-3 text-center lg:text-left">
          <Title order={3} uppercase>
            <span className="text-text-accent-yellow">stake</span> your locked
            cybro here
          </Title>
          <Typography order={2} variant="poppins" className="text-white/80">
            Locked CYBRO can be staked in flexible pools with durations of 5,
            10, or 15 months, offering competitive APR rates. The longer you
            stake, the higher the rewards.
          </Typography>
        </Stack>

        <TotalStaked />

        <StakingBalances />

        <StakedReports />
      </Stack>

      <Stack className="gap-2.5">
        <Stake />
        <a
          href={links.stakingPessimisticAudit}
          target="_blank"
          rel="noreferrer"
          className="self-center hover:animate-pulse animate-infinite w-fit"
        >
          <PessimisticCertIcon />
        </a>
      </Stack>
    </Stack>
  );
};
