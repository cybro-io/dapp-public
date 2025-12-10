'use client';
import React from 'react';

import { DashboardV2Page } from '@/views/DashboardPage';

import { BaseLayout } from '../layouts';

export default function Dashboard() {
  return (
    <BaseLayout>
      <DashboardV2Page />
    </BaseLayout>
  );
}
