'use client';

import React from 'react';

import { useFlag } from '@unleash/proxy-client-react';

import { Flag } from '@/shared/lib';
import { PageHeader } from '@/widgets/PageHeader';
import { TiersModal } from '@/widgets/StakingCybro/ui/TiersModal';

import { BaseLayout } from '../../../../app/layouts';

import { StakingTab } from './StakingTab';

export const StakingPage = () => {
  const isEnabledTiers = useFlag(Flag.tiers);

  return (
    <React.Fragment>
      <PageHeader className="!pt-[43px]">
        <PageHeader.Title>
          <span className="text-text-accent-yellow">Cybro</span> Staking
        </PageHeader.Title>
      </PageHeader>
      <BaseLayout.Container className="!px-0 pt-4 md:pt-[20px] flex flex-col items-center">
        <StakingTab />
        {isEnabledTiers && <TiersModal id="tiersModal" />}
      </BaseLayout.Container>
    </React.Fragment>
  );
};

export default StakingPage;
