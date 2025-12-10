import React from 'react';

import { OneClickPage } from '@/views/OneClickPage';

import { BaseLayout } from '../layouts';

export default function OneClick() {
  return (
    <BaseLayout withMainPadding={false}>
      <OneClickPage />
    </BaseLayout>
  );
}
