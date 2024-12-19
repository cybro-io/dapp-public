import React from 'react';

import { QueryClient } from '@tanstack/react-query';

import { BaseLayout } from '@/app/layouts';
import { QueryKey } from '@/shared/const';
import { getFundsApiV1VaultsGet } from '@/shared/types';
import { ExplorePage } from '@/views/ExplorePage';

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
