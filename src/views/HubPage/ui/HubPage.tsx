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
        <HubHero
          title={'Find Your Ideal\nInvestment vault'}
          desc="Discover a range of investment options tailored to your needs, from
          automated solutions to customizable strategies"
        />
        <HubVaults />
      </div>
      <HubOneClick />
      <div className="relative flex flex-col max-w-screen-xl mx-auto">
        <HubBlog />
        <HubBanner />
      </div>
    </BaseLayout>
  );
};

export default HubPage;
