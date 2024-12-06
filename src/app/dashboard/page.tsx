import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { DashboardPage } from '@/views/DashboardPage';

export default async function Dashboard() {
  return (
    <BaseLayout>
      <DashboardPage />
    </BaseLayout>
  );
}
