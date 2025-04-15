'use client';

import React from 'react';

import { useFlag, useFlagsStatus } from '@unleash/proxy-client-react';

import { Flag } from '@/shared/lib';
import { AiBrokerComingPage, AiBrokerPage } from '@/views/AiBrokerPage';

import { BaseLayout } from '../layouts';

export default function Page() {
  const isEnabledFlag = useFlag(Flag.aiBrokerPage);
  const flagsStatus = useFlagsStatus();
  return (
    <BaseLayout withMainPadding={false} hasFooter={false}>
      {flagsStatus.flagsReady &&
        (isEnabledFlag ? <AiBrokerPage /> : <AiBrokerComingPage />)}
    </BaseLayout>
  );
}
