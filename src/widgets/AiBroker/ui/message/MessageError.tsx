import React from 'react';

import { Button, ButtonSize } from '@/shared/ui';
import { useAiBrokerContext } from '@/widgets/AiBroker';

import { AiBrokerChatError } from '../../model/types';

import { AiBrokerMessage } from './AiBrokerMessage';

export const MessageError = ({ id, content, position }: AiBrokerChatError) => {
  const { handleStartChat, isLoadingStart, lastMessage } = useAiBrokerContext();

  return (
    <AiBrokerMessage
      position={position}
      messages={[
        content,
        lastMessage?.id === id && (
          <Button
            key="try_again"
            className="w-fit"
            size={ButtonSize.Small}
            onClick={() => handleStartChat(false)}
            isLoading={isLoadingStart}
            disabled={isLoadingStart}
          >
            Try again
          </Button>
        ),
      ]}
      userIcon={position === 'right' ? null : undefined}
    />
  );
};
