import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { StakingPage } from '@/views/StakingPage';

const Page = () => {
  return (
    <BaseLayout withMainPadding={false}>
      <StakingPage />
    </BaseLayout>
  );
};

export default Page;
