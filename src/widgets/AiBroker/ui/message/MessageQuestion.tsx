import React from 'react';

import { AiBrokerChatQuestion } from '../../model/types';

import { AiBrokerMessage } from './AiBrokerMessage';

export const MessageQuestion = ({ text, position }: AiBrokerChatQuestion) => {
  return <AiBrokerMessage position={position} messages={[text]} />;
};
