import React from 'react';

import { AiBrokerChatAnswer } from '../../model/types';

import { AiBrokerMessage } from './AiBrokerMessage';

export const MessageAnswer = ({ content, position }: AiBrokerChatAnswer) => {
  return (
    <AiBrokerMessage
      position={position}
      messages={Array.isArray(content) ? content : [content]}
      userIcon={position === 'right' ? null : undefined}
    />
  );
};
