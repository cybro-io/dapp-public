import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { links } from '@/shared/lib';
import { Button, Link, LinkView, Stack, Title, Typography } from '@/shared/ui';
import BgImage from '@assets/images/ClaimTokenCardSmallBg.webp';

import { StakingBalances } from './StakingBalances';
import classNames from './StakingCybro.module.scss';

export const ClaimToken = () => {
  return (
    <React.Fragment>
      <Stack
        className={clsx(
          'px-6 lg:px-0 w-full lg:w-[936px] h-full lg:h-[617px] justify-end',
          classNames.claimBg,
        )}
      >
        <Stack className="w-full h-full lg:h-[575px] bg-transparent lg:bg-background-card rounded-[30px] px-0 lg:px-[52px] items-center lg:items-start">
          <Stack className="justify-start lg:justify-center z-10 flex-1 max-w-[392px] gap-[30px] lg:gap-6">
            <Stack className="gap-2.5 lg:gap-3 text-center lg:text-left">
              <Title order={3} uppercase>
                <span className="text-text-accent-yellow">BUY</span> your locked
                cybro here
              </Title>
              <Typography order={2} variant="poppins" className="text-white/80">
                Locked Cybro are tokens earned within the CYBRO ecosystem. These
                tokens cannot be sold or transferred but can be staked in
                dedicated pools with varying durations and APRs. At the end of
                the staking period, Locked Cybro can be exchanged for regular
                CYBRO tokens, maximizing your rewards.
              </Typography>
            </Stack>

            <StakingBalances />

            <Stack className="gap-5 lg:gap-6 max-w-[327px] lg:max-w-[317px] w-full self-center lg:self-auto items-center lg:items-start">
              <Button className="w-full">BUY locked cybro </Button>
              <Link
                viewType={LinkView.Link}
                href={links.docCybroPoints}
                target={'_blank'}
              >
                FAQ on locked cybro
              </Link>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
      <Image src={BgImage} alt="bg" className="block lg:hidden" />
    </React.Fragment>
  );
};
