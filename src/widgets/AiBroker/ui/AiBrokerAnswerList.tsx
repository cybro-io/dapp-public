import React from 'react';

import { Button } from '@heroui/button';

import { Group } from '@/shared/ui';
import { AiBrokerMessageType } from '@/widgets/AiBroker/model/types';

import { useAiBrokerContext } from '../model/context';

export const AiBrokerAnswerList = () => {
  const { lastMessage, handleAnswer, isLoadingAnswer } = useAiBrokerContext();

  if (
    !lastMessage ||
    lastMessage.type !== AiBrokerMessageType.question ||
    isLoadingAnswer
  ) {
    return null;
  }

  return (
    <Group className="justify-end gap-2">
      {lastMessage.suggestions.map((answer) => (
        <Button
          className="!whitespace-normal h-auto py-1.5 px-3 bg-black border-solid border border-transparent hover:border-text-accent-logoYellow"
          key={answer.text}
          onClick={() => handleAnswer(answer)}
        >
          {answer.text}
        </Button>
      ))}
    </Group>
  );
};
