'use client';

import React from 'react';

import { BaseLayout } from '@/app/layouts';
import {
  HubBanner,
  HubBlog,
  HubHero,
  HubOneClick,
  HubVaults,
} from '@/widgets/Hub';

const HubPage = () => {
  return (
    <BaseLayout withMainPadding={false}>
      <div className="relative flex flex-col max-w-screen-xl mx-auto">
        <HubHero />
        <HubVaults />
        <HubOneClick />
        <HubBlog />
        <HubBanner />
      </div>
    </BaseLayout>
  );
};

export default HubPage;
