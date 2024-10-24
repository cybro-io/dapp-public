import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { SupportRequestPage } from '@/views/SupportRequestPage';

export default async function Feedback() {
  return (
    <BaseLayout>
      <SupportRequestPage />
    </BaseLayout>
  );
}
