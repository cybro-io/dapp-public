import React from 'react';

import { QueryClient } from '@tanstack/react-query';

import { AnalyticsEvent } from '@/shared/analytics';
import { PageViewAnalytics } from '@/shared/analytics/page-view-analytics';
import { QueryKey } from '@/shared/lib';
import {
  getFundApiV1VaultsVaultIdGet,
  getFundHistoryTrustScoreApiV1VaultsVaultIdHistoryTrustScoreGet,
} from '@/shared/types';
import { VaultPageV2 } from '@/views/VaultPage';

import { BaseLayout } from '../../layouts';

export default async function Vault({ params }: { params: { id: string } }) {
  const queryClient = new QueryClient();
  const vaultId = Number(params.id);

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.Vault, vaultId],
    queryFn: () => getFundApiV1VaultsVaultIdGet(vaultId),
  });

  await queryClient.prefetchQuery({
    queryKey: [QueryKey.TrustScoreDetails, vaultId],
    queryFn: () =>
      getFundHistoryTrustScoreApiV1VaultsVaultIdHistoryTrustScoreGet(vaultId),
  });

  return (
    <BaseLayout>
      <PageViewAnalytics
        pageType={AnalyticsEvent.PageLoadVault}
        pageId={vaultId}
      />
      {/*<VaultPage vaultId={vaultId} />*/}
      <VaultPageV2 vaultId={vaultId} />
    </BaseLayout>
  );
}
