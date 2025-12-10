import React from 'react';

import { NotFoundPage } from '@/views/NotFoundPage';

import { BaseLayout } from './layouts';

export default function OneClick() {
  return (
    <BaseLayout hasFooter={false}>
      <NotFoundPage />
    </BaseLayout>
  );
}
