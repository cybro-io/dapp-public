import React from 'react';

import Image from 'next/image';

import { Group, Stack, Title, Typography } from '@/shared/ui';
import AcceptIcon from '@assets/icons/accept.svg';

import HubAiBrokerImage from '../lib/assets/hub-ai-broker.png';

export const HubAiBroker = () => {
  return (
    <Stack className="md:flex-row flex-nowrap gap-y-6 md:px-[50px] px-0">
      <Stack className="pt-0 md:pt-[125px] gap-4 md:gap-6 px-6 md:px-0">
        <Stack className="gap-1.5 md:gap-2">
          <Title
            order={{ md: 1, base: 2 }}
            uppercase
            className="relative w-fit"
          >
            <Group className="absolute bg-black rounded-[40px] md:px-5 px-2.5 md:py-3 py-1.5 w-fit rotate-12 -right-12 md:-right-10 md:-top-6 -top-2">
              <Typography
                order={{ md: 2, base: 3 }}
                uppercase
                className="text-text-accent-logoYellow"
              >
                Beta
              </Typography>
            </Group>
            AI Broker
          </Title>
          <Title
            order={{ md: 3, base: 4 }}
            uppercase={{ md: true, base: false }}
          >
            Your Investment Assistant
          </Title>
        </Stack>
        <Typography
          variant="poppins"
          order={2}
          weight="regular"
          className="text-white/60 max-w-[379px]"
        >
          Choose a fund, invest, and grow your portfolio — all in one place,
          hassle-free
        </Typography>

        <Stack className="gap-2.5 md:gap-3">
          <AcceptField>Answer a few quick questions</AcceptField>
          <AcceptField>Get the best investment options*</AcceptField>
          <AcceptField>Deposit in just a few clicks</AcceptField>
        </Stack>
      </Stack>

      <div className="relative">
        <Image
          src={HubAiBrokerImage}
          alt="ai broker"
          className="mt-[-28px] w-full lg:max-w-[696px]"
          loading="lazy"
        />
        <Typography
          variant={{ md: 'poppins', base: 'caption' }}
          order={{ md: 3, base: 4 }}
          weight="medium"
          className="text-white/20 max-w-[389px] absolute mx-auto bottom-0 md:bottom-[15%] left-0 right-0 text-center px-6 md:px-0"
        >
          *None of the provided options should be considered as financial advice
          or a recommended investment strategy.
        </Typography>
      </div>
    </Stack>
  );
};

const AcceptField = ({ children }: React.PropsWithChildren) => {
  return (
    <Group className="gap-2 flex-nowrap items-center">
      <AcceptIcon className="flex-shrink-0" />
      <Typography
        order={{ md: 2, base: 3 }}
        className="text-text-accent-yellow"
      >
        {children}
      </Typography>
    </Group>
  );
};
