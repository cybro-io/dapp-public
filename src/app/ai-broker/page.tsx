import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { AiBrokerPage } from '@/views/OneClickPage';

export default function OneClick() {
  return (
    <BaseLayout withMainPadding={false}>
      <AiBrokerPage />
    </BaseLayout>
  );
}
