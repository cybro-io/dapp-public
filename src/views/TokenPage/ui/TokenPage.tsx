'use client';

import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { ClaimLockedToken } from '@/features/ClaimLockedToken';
import { PageHeader } from '@/widgets/PageHeader';

export const TokenPage = ({ lockedAddress }: { lockedAddress?: string }) => {
  return (
    <React.Fragment>
      <PageHeader className="!pt-[43px]">
        <PageHeader.Title>
          cybro TOKEN <span className="text-text-accent-yellow">Claim</span>
        </PageHeader.Title>
      </PageHeader>
      <BaseLayout.Container className="!px-0 pt-4 md:pt-[97px] flex flex-col items-center">
        <ClaimLockedToken lockedAddress={lockedAddress} />
      </BaseLayout.Container>
    </React.Fragment>
  );
};

export default TokenPage;
