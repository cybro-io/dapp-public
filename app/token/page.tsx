import React from 'react';

import { TokenPage } from '@/views/TokenPage/ui';

import { BaseLayout } from '../layouts';

export default function Page() {
  return (
    <BaseLayout withMainPadding={false}>
      <TokenPage />
    </BaseLayout>
  );
}
