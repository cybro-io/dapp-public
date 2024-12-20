import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { OneClickPage } from '@/views/OneClickPage';

export default function OneClick() {
  return (
    <BaseLayout withMainPadding={false}>
      <OneClickPage />
    </BaseLayout>
  );
}
