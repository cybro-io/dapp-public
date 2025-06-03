import React from 'react';

import { QueryClient } from '@tanstack/react-query';

import { QueryKey } from '@/shared/lib';
import { getFundsApiV1VaultsGet } from '@/shared/types';
import { ExplorePage } from '@/views/ExplorePage';

import { BaseLayout } from '../layouts';

export default async function VaultsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.AvailableVaults],
    queryFn: () => getFundsApiV1VaultsGet(),
  });

  return (
    <BaseLayout>
      <ExplorePage />
    </BaseLayout>
  );
}
