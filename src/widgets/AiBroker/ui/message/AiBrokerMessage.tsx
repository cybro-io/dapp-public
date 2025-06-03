import React from 'react';

import Image from 'next/image';
import { twMerge } from 'tailwind-merge';

import { Group, Stack } from '@/shared/ui';
import CybroUserImage from '@assets/images/cybro-user.png';

import { AiBrokerMessageBubble } from './AiBrokerMessageBubble';

interface AiBrokerMessageProps extends React.PropsWithChildren {
  position?: 'left' | 'right';
  userIcon?: React.ReactNode;
  messages?: React.ReactNode[];
}

export const AiBrokerMessage = ({
  children,
  position = 'left',
  messages,
  userIcon = (
    <Image
      src={CybroUserImage}
      alt="Logo"
      className="size-[30px] md:size-[50px]"
    />
  ),
}: AiBrokerMessageProps) => (
  <Group
    className={twMerge(
      'flex-nowrap gap-4',
      position === 'right' && 'flex-row-reverse',
    )}
  >
    {userIcon && <Group className="items-end flex-shrink-0">{userIcon}</Group>}
    <Stack className="flex-nowrap gap-2 max-w-[80%]">
      {messages?.map((message) =>
        typeof message === 'string' ? (
          <AiBrokerMessageBubble
            key={message}
            color={position === 'left' ? 'light' : 'dark'}
          >
            {message}
          </AiBrokerMessageBubble>
        ) : (
          message
        ),
      )}
      {children}
    </Stack>
  </Group>
);
