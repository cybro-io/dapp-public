'use client';

import React from 'react';

import { BridgePage } from '@/views/BridgePage';

import { BaseLayout } from '../layouts';

const Page = () => {
  return (
    <BaseLayout withMainPadding={false}>
      <BridgePage />
    </BaseLayout>
  );
};

export default Page;
