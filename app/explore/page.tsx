'use client';
import React, { useEffect } from 'react';

import { useRouter } from 'next/navigation';

import { ExplorePage } from '@/views/ExplorePage';

import { BaseLayout } from '../layouts';

export default function VaultsPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace('/one-click');
  }, [router]);

  return (
    <BaseLayout>
      <ExplorePage />
    </BaseLayout>
  );
}
