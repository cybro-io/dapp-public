import React from 'react';

import Image from 'next/image';

import { Group, Stack, Title } from '@/shared/ui';

import { partners } from '../lib/constants/partners';

export const HubPartners = () => {
  return (
    <Stack className="flex-nowrap gap-6 py-8 px-[50px]">
      <Title order={4} className="font-medium">
        Partnership Network
      </Title>
      <Group className="gap-10 justify-center">
        {partners.map((partner) => (
          <Image
            loading="lazy"
            key={partner.name}
            src={partner.image}
            alt={partner.name}
            width={154}
            className="pointer-events-none"
          />
        ))}
      </Group>
    </Stack>
  );
};
