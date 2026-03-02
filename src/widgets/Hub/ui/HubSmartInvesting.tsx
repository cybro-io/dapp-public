import React from 'react';

import Image from 'next/image';

import { useMatches } from '@/shared/lib';
import { Stack, Title } from '@/shared/ui';

import HubSmartInvestingMobileImage from '../lib/assets/hub-smart-investing-mobile.png';
import HubSmartInvestingImage from '../lib/assets/hub-smart-investing.png';

export const HubSmartInvesting = () => {
  const hubImageSrc = useMatches({
    md: HubSmartInvestingImage,
    base: HubSmartInvestingMobileImage,
  });

  return (
    <Stack className="w-full items-center gap-6">
      <Title order={3} uppercase className="block md:hidden text-center">
        Smart Investing with CYBRO
      </Title>
      <Stack className="w-full bg-black items-center">
        <Image
          loading="lazy"
          src={hubImageSrc}
          alt={'smart investing'}
          className="pointer-events-none w-full max-w-screen-xl"
        />
      </Stack>
    </Stack>
  );
};
