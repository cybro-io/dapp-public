import React from 'react';

import { StakeConfirmationModal } from '@/features/Stake/ui/StakeConfirmationModal';
import { links } from '@/shared/lib';
import { Link, LinkView, Stack, Title } from '@/shared/ui';

import { StakeContextProvider } from '../model/StakeContext';
import { UseStakeProps } from '../model/useStake';

import { StakeAmount } from './StakeAmount';
import { StakeButton } from './StakeButton';
import { StakePeriod } from './StakePeriod';
import { StakeReward } from './StakeReward';

export const Stake = (props: UseStakeProps) => {
  return (
    <StakeContextProvider {...props}>
      <Stack className="bg-transparent lg:bg-background-window rounded-[30px] gap-4 p-0 lg:p-6 w-full max-w-[327px] lg:max-w-none lg:w-[375px] items-center">
        <Title order={4}>
          Stake {props.isLockedCybro ? 'LockedCYBRO' : 'CYBRO'}
        </Title>

        <StakePeriod />

        <StakeAmount />

        <StakeReward>
          <StakeButton />
        </StakeReward>

        <Link
          viewType={LinkView.Link}
          href={links.docStaking}
          target={'_blank'}
        >
          How To Stake?
        </Link>
      </Stack>
      <StakeConfirmationModal />
    </StakeContextProvider>
  );
};
