'use client';

import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { PageHeader } from '@/widgets/PageHeader';
import { StakeToken } from '@/widgets/Staking';

export const StakingPage = () => {
  return (
    <React.Fragment>
      <PageHeader className="!pt-[43px]">
        <PageHeader.Title>
          <span className="text-text-accent-yellow">Cybro</span> Staking
        </PageHeader.Title>
      </PageHeader>
      <BaseLayout.Container className="!px-0 pt-4 md:pt-[43px] flex flex-col items-center">
        {/*<ClaimToken />*/}
        <StakeToken />
      </BaseLayout.Container>
    </React.Fragment>
  );
};

export default StakingPage;
