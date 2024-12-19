'use client';
import React from 'react';

import { BaseLayout } from '@/app/layouts';
import { DashboardV2Page } from '@/views/DashboardPage';

export default function Dashboard() {
  return (
    <BaseLayout>
      <DashboardV2Page />
    </BaseLayout>
  );
}
