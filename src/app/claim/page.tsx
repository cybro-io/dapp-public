'use client';

import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { useStakingConfig } from '@/entities/Staking';
import { ClaimPage } from '@/views/ClaimPage';

const Page = () => {
  const { config } = useStakingConfig();

  return (
    <BaseLayout withMainPadding={false}>
      <ClaimPage lockedAddress={config?.token.locked} />
    </BaseLayout>
  );
};

export default Page;
