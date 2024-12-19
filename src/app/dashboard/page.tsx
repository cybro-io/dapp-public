'use client';
import React from 'react';

import { useLocalStorage } from 'usehooks-ts';

import { BaseLayout } from '@/app/layouts';
import { DashboardPage, DashboardV2Page } from '@/views/DashboardPage';

export default function Dashboard() {
  const [value] = useLocalStorage<string | undefined>('dbv2', undefined);

  return (
    <BaseLayout>
      {value === 'test' ? <DashboardV2Page /> : <DashboardPage />}
    </BaseLayout>
  );
}
