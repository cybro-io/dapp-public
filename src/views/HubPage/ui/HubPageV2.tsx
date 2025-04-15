'use client';

import React from 'react';

import { MainLayout } from '@/layouts/MainLayout';
import { Stack } from '@/shared/ui';
import {
  HubAdvantages,
  HubAiBroker,
  HubBlog,
  HubFAQ,
  HubFeaturedVaults,
  HubLinks,
  HubPartners,
  HubSmartInvesting,
  HubTitle,
  HubWhyUs,
} from '@/widgets/Hub';

export const HubPageV2 = () => {
  return (
    <MainLayout>
      <Stack className="items-center gap-[75px] md:gap-[90px] flex-nowrap pt-[49px] md:pt-[108px] pb-[90px] mx-auto">
        <HubTitle />
        <HubLinks />
        <HubSmartInvesting />
        <HubFeaturedVaults />
        <HubAdvantages />
        <HubWhyUs />
        <HubAiBroker />
        <HubPartners />
        <HubBlog />
        <HubFAQ />
      </Stack>
    </MainLayout>
  );
};
