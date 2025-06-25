import React from 'react';

import Image from 'next/image';

import { Group, Stack, Title, Typography } from '@/shared/ui';

import ReferralActionImage from '../lib/assets/referral-action-image.png';

export const ReferralCallAction = () => {
  return (
    <Group className="w-full max-w-[513px] h-full max-h-[412px] relative justify-center">
      <Stack className="absolute mx-auto top-10 md:top-[60px] text-center gap-2.5 items-center">
        <Title
          uppercase
          order={{ base: 4, md: 3 }}
          className="max-w-[344px] text-text-accent-logoYellow whitespace-pre-wrap"
        >
          Referral Bonuses{'\n'}
          <text className="text-white">on the Horizon</text>
        </Title>
        <Typography variant="poppins" order={3} className="max-w-[204px]">
          Stay tuned for new rewards for active participants —&nbsp;
          <text className="font-bold">
            including XP boosts, exclusive achievements
          </text>
          , and more.
        </Typography>
      </Stack>

      <Image
        src={ReferralActionImage}
        alt="action image"
        className="rounded-[20px]"
      />
    </Group>
  );
};
