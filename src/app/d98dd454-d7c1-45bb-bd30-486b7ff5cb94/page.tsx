'use client';

import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { TokenPage } from '@/views/TokenPage';

const Page = () => {
  return (
    <BaseLayout withMainPadding={false}>
      <TokenPage lockedAddress="0x9Ac9b1f582EDc6121c826b96c94dF331A8F66919" />
    </BaseLayout>
  );
};

export default Page;
