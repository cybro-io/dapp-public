'use client';
import React from 'react';

import { ReferralPage } from '@/views/ReferralPage';

import { BaseLayout } from '../layouts';

export default function Dashboard() {
  return (
    <BaseLayout>
      <ReferralPage />
    </BaseLayout>
  );
}
