'use client';

import React from 'react';

import { AiBrokerBox } from './AiBrokerBox';
import { AiBrokerChatContent } from './AiBrokerChatContent';
import { AiBrokerChatFooter } from './AiBrokerChatFooter';
import { AiBrokerChatHeader } from './AiBrokerChatHeader';
import { AiBrokerDepositProvider } from './stepper/AiBrokerDepositProvider';

export const AiBrokerChat = () => {
  return (
    <AiBrokerDepositProvider>
      <AiBrokerBox className="p-0 md:pb-5 pb-3">
        <AiBrokerChatHeader />
        <AiBrokerChatContent />
        <AiBrokerChatFooter />
      </AiBrokerBox>
    </AiBrokerDepositProvider>
  );
};
