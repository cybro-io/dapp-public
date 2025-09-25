import React, { useEffect } from 'react';

import NiceModal from '@ebay/nice-modal-react';
import clsx from 'clsx';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

import { useStakingConfig } from '@/entities/Staking';
import { Stake } from '@/features/Stake';
import { StakeContextProvider } from '@/features/Stake/model/StakeContext';
import { links } from '@/shared/lib';
import { Stack, Title, Typography } from '@/shared/ui';
import PessimisticCertIcon from '@assets/icons/certic3.svg';

import { StakedReports } from './StakedReports';
import { StakingBalances } from './StakingBalances';
import classNames from './StakingCybro.module.scss';
import { TotalStaked } from './TotalStaked';

export const StakingCybro = () => {
  const { config } = useStakingConfig();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const isHasTiers = searchParams.has('tiers');

    if (isHasTiers) {
      router.replace(pathname);
      NiceModal.show('tiersModal');
    }
  }, [searchParams]);

  return (
    <StakeContextProvider
      stakingData={config?.staking_cybro ?? {}}
      tokenData={config?.token ?? {}}
      isLockedCybro={false}
    >
      <Stack
        className={clsx(
          'relative lg:flex-row z-0 gap-10 lg:gap-[65px] w-full lg:w-[936px] h-full bg-transparent lg:bg-background-card rounded-[30px] px-5 lg:px-[52px] py-0 lg:py-[46px] items-center lg:items-start',
          classNames.stakeBg,
        )}
      >
        <Stack className="z-10 flex-1 max-w-[392px] gap-[30px] lg:gap-6">
          <Stack className="gap-2.5 lg:gap-3 text-center lg:text-left">
            <Title order={3} uppercase>
              <span className="text-text-accent-yellow">stake</span> your cybro
              here
            </Title>
            <Typography order={2} variant="poppins" className="text-white/80">
              CYBRO can be staked in flexible pools with durations of 5, 10, or
              15 months, offering competitive APR rates. The longer you stake,
              the higher the rewards.
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
    </StakeContextProvider>
  );
};
