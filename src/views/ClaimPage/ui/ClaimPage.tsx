'use client';

import React from 'react';

import { ClaimLockedToken } from '@/features/ClaimLockedToken';
import { PageHeader } from '@/widgets/PageHeader';

import { BaseLayout } from '../../../../app/layouts';

export const ClaimPage = ({ lockedAddress }: { lockedAddress?: string }) => {
  return (
    <React.Fragment>
      <PageHeader className="!pt-[43px] flex-col items-center">
        <PageHeader.Title>
          cybro TOKEN <span className="text-text-accent-yellow">Claim</span>
        </PageHeader.Title>
      </PageHeader>
      <BaseLayout.Container className="!px-0 pt-4 md:pt-14 flex flex-col items-center">
        <ClaimLockedToken lockedAddress={lockedAddress} />
      </BaseLayout.Container>
    </React.Fragment>
  );
};

export default ClaimPage;
