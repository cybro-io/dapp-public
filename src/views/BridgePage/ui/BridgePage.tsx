'use client';

import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { Bridge } from '@/widgets/Bridge';
import { PageHeader } from '@/widgets/PageHeader';

export const BridgePage = () => {
  return (
    <React.Fragment>
      <PageHeader className="!pt-[43px] flex-col items-center">
        <PageHeader.Title>
          cybro TOKEN <span className="text-text-accent-yellow">Bridge</span>
        </PageHeader.Title>
      </PageHeader>
      <BaseLayout.Container className="!px-0 pt-4 md:pt-14 flex flex-col items-center">
        <Bridge />
      </BaseLayout.Container>
    </React.Fragment>
  );
};

export default BridgePage;
