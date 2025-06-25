import React from 'react';

import {
  Button,
  Chip,
  ChipViewType,
  Group,
  Stack,
  Title,
  Typography,
} from '@/shared/ui';
import { useAiBrokerContext } from '@/widgets/AiBroker';
import AcceptIcon from '@assets/icons/accept.svg';
import ArrowBottomBoldIcon from '@assets/icons/arrow-bottom-bold.svg';

import { AiBrokerBox } from './AiBrokerBox';

export const AiBrokerStart = () => {
  const { handleStartChat, isLoadingStart } = useAiBrokerContext();

  return (
    <AiBrokerBox className="items-center justify-between md:justify-center md:px-[50px] md:py-4 px-4 pt-[64px] pb-[96px] gap-[64px] md:gap-6">
      <Stack className="gap-[38px] items-center">
        <Stack className="gap-[18px] items-center">
          <Chip viewType={ChipViewType.Outlined}>
            Your Investment Assistant
          </Chip>
          <div className="h-fit px-[9px] py-px bg-gradient-to-br from-white/10 to-[#6b6c78]/5 rounded-[10px] backdrop-blur-[45.05px]">
            <Title order={{ base: 2, md: 1 }} uppercase>
              AI-Broker
            </Title>
          </div>
        </Stack>
        <Typography order={1} className="text-center max-w-[518px]">
          Choose a fund, invest, and grow your portfolio — all in one place,
          hassle-free
        </Typography>
        <Stack className="gap-2 items-center">
          <Field>Answer a few quick questions</Field>
          <Field>Get the best investment options*</Field>
          <Field>Deposit in just a few clicks</Field>
        </Stack>
      </Stack>

      <ArrowBottomBoldIcon className="animate-pulse animate-infinite animate-duration-[3000ms]" />

      <Stack className="gap-[15px] items-center">
        <Typography order={3}>Wanna invest, bro?</Typography>
        <Button
          className="w-[319px]"
          isLoading={isLoadingStart}
          disabled={isLoadingStart}
          onClick={() => handleStartChat()}
        >
          Yes, let’s start
        </Button>
      </Stack>
    </AiBrokerBox>
  );
};

const Field = ({ children }: React.PropsWithChildren) => {
  return (
    <Group className="gap-2 flex-nowrap items-center">
      <AcceptIcon className="flex-shrink-0" />
      <Typography
        order={{ base: 3, md: 2 }}
        className="text-left text-text-accent-yellow"
      >
        {children}
      </Typography>
    </Group>
  );
};
