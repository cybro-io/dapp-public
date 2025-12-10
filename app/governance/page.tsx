import React from 'react';

import { GovernancePage } from '@/views/GovernancePage';

import { BaseLayout } from '../layouts';

export default function Page() {
  return (
    <BaseLayout withMainPadding={false}>
      <GovernancePage />
    </BaseLayout>
  );
}
