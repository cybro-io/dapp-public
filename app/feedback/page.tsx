import React from 'react';

import { SupportRequestPage } from '@/views/SupportRequestPage';

import { BaseLayout } from '../layouts';

export default async function Feedback() {
  return (
    <BaseLayout>
      <SupportRequestPage />
    </BaseLayout>
  );
}
