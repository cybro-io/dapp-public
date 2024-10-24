import React from 'react';

import { QueryClient } from '@tanstack/react-query';

import { BaseLayout } from '@/app/layouts';
import { QueryKey } from '@/shared/const';
import { getFundsApiV1VaultsGet } from '@/shared/types';
import { HomePage } from '@/views/HomePage';

export default async function VaultsPage() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.AvailableVaults],
    queryFn: () => getFundsApiV1VaultsGet(),
  });

  return (
    <BaseLayout>
      <HomePage />
    </BaseLayout>
  );
}
