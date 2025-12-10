import React from 'react';

import { links } from '@/shared/lib';
import { Link, LinkView, Stack, Title } from '@/shared/ui';

import { BridgeContextProvider } from '../model/BridgeContext';

import { BridgeAddress } from './BridgeAddress';
import { BridgeAmount } from './BridgeAmount';
import { BridgeButton } from './BridgeButton';
import { BridgeDirection } from './BridgeDirection';
import { BridgeProcessModal } from './BridgeProcessModal';

export const BridgeForm = () => {
  return (
    <BridgeContextProvider>
      <Stack className="bg-transparent lg:bg-background-window rounded-[30px] gap-4 p-0 lg:p-6 w-full max-w-[327px] lg:max-w-none lg:w-[375px] items-center">
        <Title order={4}>Bridge CYBRO</Title>

        <BridgeDirection />

        <BridgeAmount />
        <BridgeAddress />

        <BridgeButton />

        <Link viewType={LinkView.Link} href={links.docBridge} target={'_blank'}>
          How To Bridge?
        </Link>
      </Stack>
      <BridgeProcessModal />
    </BridgeContextProvider>
  );
};
