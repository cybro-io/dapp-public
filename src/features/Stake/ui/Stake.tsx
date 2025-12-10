import React from 'react';

import { StakeConfirmationModal } from '@/features/Stake/ui/StakeConfirmationModal';
import { links } from '@/shared/lib';
import { Link, LinkView, Stack, Title } from '@/shared/ui';

import { useStakeContext } from '../model/StakeContext';

import { StakeAmount } from './StakeAmount';
import { StakeButton } from './StakeButton';
import { StakeChain } from './StakeChain';
import { StakePeriod } from './StakePeriod';
import { StakeReward } from './StakeReward';

export const Stake = () => {
  const { isLockedCybro } = useStakeContext();

  return (
    <React.Fragment>
      <Stack className="bg-transparent lg:bg-background-window rounded-[30px] gap-4 p-0 lg:p-6 w-full max-w-[327px] lg:max-w-none lg:w-[375px] items-center">
        <Title order={4}>Stake {isLockedCybro ? 'LockedCYBRO' : 'CYBRO'}</Title>

        <StakePeriod />

        <StakeChain />

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
    </React.Fragment>
  );
};
