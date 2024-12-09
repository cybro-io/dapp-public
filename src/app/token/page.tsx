import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { TokenPage } from '@/views/TokenPage';

const Page = () => {
  return (
    <BaseLayout withMainPadding={false}>
      <TokenPage />
    </BaseLayout>
  );
};

export default Page;
