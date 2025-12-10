import React from 'react';

import { Spacer } from '@heroui/react';
import clsx from 'clsx';

import styles from '@/shared/styles/Scrollbar.module.scss';
import { Stack } from '@/shared/ui';

import { AiBrokerAnswerList } from './AiBrokerAnswerList';
import { AiBrokerMessageList } from './message/AiBrokerMessageList';

export const AiBrokerChatContent = () => {
  return (
    <Stack
      id="scroll-chat"
      className={clsx(
        styles.scrollbar,
        'px-8 flex-1 w-full flex-nowrap overflow-auto gap-4 max-h-[calc(100vh-72px-56px-80px-24px)] md:max-h-full',
      )}
    >
      <Spacer />
      <AiBrokerMessageList />
      <AiBrokerAnswerList />
      <Spacer y="px" />
    </Stack>
  );
};
