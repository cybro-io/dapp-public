import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { NotFoundPage } from '@/views/NotFoundPage';

export default function OneClick() {
  return (
    <BaseLayout hasFooter={false}>
      <NotFoundPage />
    </BaseLayout>
  );
}
