'use client';

import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { BridgePage } from '@/views/BridgePage';

const Page = () => {
  return (
    <BaseLayout withMainPadding={false}>
      <BridgePage />
    </BaseLayout>
  );
};

export default Page;
