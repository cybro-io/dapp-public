'use client';
import React from 'react';

import { ConnectWallet } from '@/features/ConnectWallet';
import { useAppKitAccount } from '@/shared/lib';
import { Group, Stack } from '@/shared/ui';
import { PageHeader } from '@/widgets/PageHeader';
import { ReferralCallAction } from '@/widgets/referral/ReferralCallAction';
import { ReferralFAQ } from '@/widgets/referral/ReferralFAQ';
import { ReferralsTable } from '@/widgets/referral/ReferralsTable';
import { ReferralStats } from '@/widgets/referral/ReferralStats';

import { BaseLayout } from '../../../../app/layouts';

export const ReferralPage = () => {
  const { isConnected } = useAppKitAccount();

  return (
    <React.Fragment>
      <PageHeader>
        <PageHeader.Title>Referral & rewards</PageHeader.Title>
      </PageHeader>
      <BaseLayout.Container className="!px-0 pt-[15px] md:pt-[59px] flex flex-col gap-[60px] items-center">
        {isConnected && <ReferralStats />}
        <Group className="justify-center gap-x-[50px] gap-y-[64px] w-full">
          {isConnected ? (
            <ReferralsTable />
          ) : (
            <Stack className="justify-center">
              <ConnectWallet />
            </Stack>
          )}
          <ReferralCallAction />
        </Group>
        <ReferralFAQ />
      </BaseLayout.Container>
    </React.Fragment>
  );
};
