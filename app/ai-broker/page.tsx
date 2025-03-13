import React from 'react';

import { AiBrokerPage } from '@/views/OneClickPage';

import { BaseLayout } from '../layouts';

export default function OneClick() {
  return (
    <BaseLayout withMainPadding={false}>
      <AiBrokerPage />
    </BaseLayout>
  );
}
