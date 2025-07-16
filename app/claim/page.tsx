'use client';

import React from 'react';

import { ChainId } from '@lifi/sdk';

import { useStakingConfig } from '@/entities/Staking';
import { ClaimPage } from '@/views/ClaimPage';

import { BaseLayout } from '../layouts';

const Page = () => {
  const { config } = useStakingConfig();

  const lockedAddress =
    config?.token[ChainId.BLS].lockedCybroAddress ?? undefined;

  return (
    <BaseLayout withMainPadding={false}>
      <ClaimPage lockedAddress={lockedAddress} />
    </BaseLayout>
  );
};

export default Page;
