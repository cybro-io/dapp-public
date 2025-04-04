import React from 'react';

import { StakingPage } from '@/views/StakingPage';

import { BaseLayout } from '../layouts';

const Page = () => {
  return (
    <BaseLayout withMainPadding={false}>
      <StakingPage />
    </BaseLayout>
  );
};

export default Page;
