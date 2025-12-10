import React from 'react';

import Link from 'next/link';

import { Button, ButtonSize, ButtonView, Group } from '@/shared/ui';
import { useAiBrokerContext } from '@/widgets/AiBroker';

import { AiBrokerChatSuccess } from '../../model/types';

import { AiBrokerMessage } from './AiBrokerMessage';

export const MessageSuccess = ({
  id,
  content,
  position,
}: AiBrokerChatSuccess) => {
  const { handleStartChat, isLoadingStart, lastMessage } = useAiBrokerContext();

  return (
    <AiBrokerMessage
      position={position}
      messages={[
        content,
        lastMessage?.id === id && (
          <Group className="gap-2 flex-nowrap justify-start">
            <Button
              size={ButtonSize.Small}
              onClick={() => handleStartChat(false)}
              isLoading={isLoadingStart}
              disabled={isLoadingStart}
            >
              Deposit again
            </Button>
            <Link href="/one-click" target="_blank">
              <Button size={ButtonSize.Small} view={ButtonView.Secondary}>
                Explore
              </Button>
            </Link>
          </Group>
        ),
      ]}
      userIcon={position === 'right' ? null : undefined}
    />
  );
};
