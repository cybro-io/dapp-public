import React from 'react';

import { Button } from '@heroui/button';
import clsx from 'clsx';
import Image from 'next/image';

import { Group, Stack, Typography } from '@/shared/ui';

import { featuredInMap, socialsMap, verifiedMap } from '../lib/constants/links';

export const HubLinks = () => {
  return (
    <Stack className="justify-between w-full max-w-screen-xl px-6 md:px-[50px] md:flex-row gap-y-8">
      <HubSocialLinks />
      <HubFeaturedLinks />
      <HubVerifiedLinks />
    </Stack>
  );
};

const HubSocialLinks = () => {
  return (
    <Stack className="gap-3 flex-1 items-center md:items-start">
      <Typography
        order={{ md: 2, base: 3 }}
        variant="poppins"
        weight="regular"
        className="text-white/40"
      >
        Join The Community
      </Typography>
      <Group className="gap-2.5 max-w-full md:max-w-[248px] justify-center md:justify-start">
        {socialsMap.map((social) => (
          <Button
            key={social.name}
            as="a"
            isIconOnly={true}
            className="bg-button-secondary-defaultBg h-10 md:h-[61px] w-[50px] md:w-[76px] max-w-min min-w-[50px] md:min-w-[76px]"
            href={social.link}
            target="_blank"
          >
            <social.image />
          </Button>
        ))}
      </Group>
    </Stack>
  );
};

const HubFeaturedLinks = () => {
  return (
    <Stack className="gap-3 flex-[2] items-center md:items-start">
      <Typography
        order={{ md: 2, base: 3 }}
        variant="poppins"
        weight="regular"
        className="text-white/40"
      >
        Featured in
      </Typography>
      <Group className="gap-2.5 max-w-[543px] justify-center md:justify-start">
        {featuredInMap.map((featuredIn) => (
          <Button
            key={featuredIn.name}
            as="a"
            className={clsx(
              'bg-button-secondary-defaultBg h-10 md:h-[61px] px-3 md:px-5 !min-w-min w-fit',
              featuredIn.order,
            )}
            href={featuredIn.link}
            target="_blank"
          >
            <featuredIn.image className="flex-shrink-0" />
            {featuredIn.name.toUpperCase()}
          </Button>
        ))}
      </Group>
    </Stack>
  );
};

const HubVerifiedLinks = () => {
  return (
    <Stack className="gap-3 flex-1 items-center md:items-start">
      <Typography
        order={{ md: 2, base: 3 }}
        variant="poppins"
        weight="regular"
        className="text-white/40"
      >
        Verified by
      </Typography>
      <Group className="w-fit gap-2.5 grid grid-cols-2">
        {verifiedMap.map((audit) => (
          <a
            key={audit.name}
            href={audit.link}
            target="_blank"
            rel="noreferrer"
          >
            <Image
              loading="lazy"
              src={audit.image}
              alt={audit.name}
              className="hover:animate-pulse"
            />
          </a>
        ))}
      </Group>
    </Stack>
  );
};
