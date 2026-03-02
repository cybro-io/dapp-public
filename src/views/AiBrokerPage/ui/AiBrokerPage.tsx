'use client';

import React from 'react';

import { Stack, Typography } from '@/shared/ui';
import {
  AiBrokerChat,
  AiBrokerContextProvider,
  AiBrokerStart,
  useAiBrokerContext,
} from '@/widgets/AiBroker';

import styles from './AiBrokerPage.module.scss';

const AiBrokerPageInner = () => {
  const { isStartedChat } = useAiBrokerContext();
  return (
    <section className={styles.bg}>
      <Stack className="items-center gap-8">
        {isStartedChat ? <AiBrokerChat /> : <AiBrokerStart />}

        <Typography
          variant="poppins"
          order={3}
          className="text-center text-white/40 max-w-[267px] md:max-w-[482px]"
        >
          *None of the provided options should be considered as financial advice
          or a recommended investment strategy.
        </Typography>
      </Stack>
    </section>
  );
};

export const AiBrokerPage = () => {
  return (
    <AiBrokerContextProvider>
      <AiBrokerPageInner />
    </AiBrokerContextProvider>
  );
};
