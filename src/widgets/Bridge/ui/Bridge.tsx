import React from 'react';

import clsx from 'clsx';

import { BridgeForm } from '@/features/BridgeForm';
import { Group, Stack, Title, Typography } from '@/shared/ui';
import AcceptIcon from '@assets/icons/accept.svg';

import classNames from './Bridge.module.scss';

export const Bridge = () => {
  return (
    <Stack
      className={clsx(
        'relative lg:flex-row z-0 gap-10 lg:gap-[65px] w-full lg:w-[936px] h-full bg-transparent lg:bg-background-card rounded-[30px] px-5 lg:px-[52px] py-0 lg:py-[46px] items-center lg:items-start',
        classNames.root,
      )}
    >
      <Stack className="z-10 flex-1 max-w-[392px] gap-[30px] lg:gap-6 h-[600px]">
        <Stack className="justify-between flex-nowrap h-full gap-8">
          <Stack className="gap-2.5 lg:gap-3 text-center lg:text-left">
            <Title order={3} uppercase>
              <span className="text-text-accent-yellow">bridge</span> your cybro
              here
            </Title>
            <Typography order={2} variant="poppins" className="text-white/80">
              Seamlessly transfer your CYBRO tokens between networks with just a
              few clicks. Our bridge ensures fast, secure, and low-cost
              transfers, enabling you to access CYBRO on your preferred
              blockchain.
            </Typography>
          </Stack>

          <Stack className="gap-4">
            <Field
              title="Instant Transfers"
              desc="Move your tokens across networks without delays"
            />
            <Field
              title="Wide Compatibility"
              desc="Supports all major blockchain networks"
            />
            <Field
              title="User-Friendly"
              desc="Designed for simplicity and speed"
            />
          </Stack>
        </Stack>
      </Stack>

      <Stack className="gap-2.5">
        <BridgeForm />
      </Stack>
    </Stack>
  );
};

const Field = ({ title, desc }: { title: string; desc: string }) => {
  return (
    <Group className="gap-2 flex-nowrap">
      <AcceptIcon className="flex-shrink-0" />
      <Typography order={3} className="text-left">
        <span className="text-text-accent-yellow">{title}:</span>
        &nbsp;{desc}
      </Typography>
    </Group>
  );
};
