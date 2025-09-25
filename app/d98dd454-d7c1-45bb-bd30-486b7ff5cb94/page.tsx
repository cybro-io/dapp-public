'use client';

import React from 'react';

import { ClaimPage } from '@/views/ClaimPage';

import { BaseLayout } from '../layouts';

const Page = () => {
  return (
    <BaseLayout withMainPadding={false}>
      <ClaimPage lockedAddress="0x9Ac9b1f582EDc6121c826b96c94dF331A8F66919" />
    </BaseLayout>
  );
};

export default Page;
