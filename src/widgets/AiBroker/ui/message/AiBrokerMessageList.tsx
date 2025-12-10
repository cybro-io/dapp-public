import React from 'react';

import { useAiBrokerContext } from '@/widgets/AiBroker';

import { AiBrokerMessageType } from '../../model/types';

import { MessageAnswer } from './MessageAnswer';
import { MessageError } from './MessageError';
import { MessageProgress } from './MessageProgress';
import { MessageQuestion } from './MessageQuestion';
import { MessageSelectedFund } from './MessageSelectedFund';
import { MessageSelectedTokenAndAmount } from './MessageSelectedTokenAndAmount';
import { MessageSelectFund } from './MessageSelectFund';
import { MessageSelectToken } from './MessageSelectToken';
import { MessageSuccess } from './MessageSuccess';

const messageComponents: Record<
  AiBrokerMessageType,
  React.FunctionComponent<any>
> = {
  [AiBrokerMessageType.question]: MessageQuestion,
  [AiBrokerMessageType.answer]: MessageAnswer,
  [AiBrokerMessageType.selectFund]: MessageSelectFund,
  [AiBrokerMessageType.selectedFund]: MessageSelectedFund,
  [AiBrokerMessageType.selectedAddress]: MessageAnswer,
  [AiBrokerMessageType.selectTokenAndAmount]: MessageSelectToken,
  [AiBrokerMessageType.selectedTokenAndAmount]: MessageSelectedTokenAndAmount,
  [AiBrokerMessageType.depositProgress]: MessageProgress,
  [AiBrokerMessageType.error]: MessageError,
  [AiBrokerMessageType.success]: MessageSuccess,
};

export const AiBrokerMessageList = () => {
  const { brokerHistory, isLoadingAnswer } = useAiBrokerContext();

  return (
    <React.Fragment>
      {brokerHistory.chat.map((message) => {
        const MessageComponent = messageComponents[message.type];

        return <MessageComponent key={message.id} {...message} />;
      })}
      {isLoadingAnswer && (
        <div className="flex gap-2 pl-[46px] md:pl-[66px]">
          <div className="w-3 h-3 rounded-full animate-bounce bg-text-accent-logoYellow [animation-delay:-0.3s]"></div>
          <div className="w-3 h-3 rounded-full animate-bounce bg-text-accent-logoYellow [animation-delay:-0.15s]"></div>
          <div className="w-3 h-3 rounded-full animate-bounce bg-text-accent-logoYellow"></div>
        </div>
      )}
    </React.Fragment>
  );
};
