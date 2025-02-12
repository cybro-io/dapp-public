'use client';

import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { useStakingConfig } from '@/entities/Staking';
import { TokenPage } from '@/views/TokenPage';

const Page = () => {
  const { config } = useStakingConfig();

  return (
    <BaseLayout withMainPadding={false}>
      <TokenPage lockedAddress={config?.token.locked} />
    </BaseLayout>
  );
};

export default Page;
