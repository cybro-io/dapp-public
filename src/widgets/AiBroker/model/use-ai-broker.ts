import { nanoid } from 'nanoid';

import { AnalyticsEvent, track } from '@/shared/analytics';
import { useAppKitAccount } from '@/shared/lib';
import {
  AIBrokerFinalResponse,
  AIBrokerResponseData,
  AssessmentAnswer,
  useGetSuggestedFundsApiV1AiBrokerPost,
} from '@/shared/types';

import { useAiBrokerForm } from '../model/use-ai-broker-form';

import {
  AiBrokerChatQuestion,
  AiBrokerChatType,
  AiBrokerMessageType,
} from './types';
import { useStartAiBrokerMutation } from './use-start-ai-broker-mutation';

export const useAiBroker = () => {
  const { isConnected } = useAppKitAccount();

  const {
    brokerHistory,
    lastMessage,
    addChatItem,
    setChatItem,
    resetValues,
    removeLastMessages,
    setAssessmentId,
    setAddress,
  } = useAiBrokerForm();

  const { mutateAsync: startMutate, isPending: isLoadingStart } =
    useStartAiBrokerMutation();

  const { mutateAsync, isPending: isLoadingAnswer } =
    useGetSuggestedFundsApiV1AiBrokerPost();

  const handleStartChat = (withReset = true) => {
    const assessmentId = nanoid();
    startMutate({ data: { assessment_id: assessmentId } }).then((data) => {
      if (withReset) {
        resetValues();
      }

      const suggestionData = data.data.data as AIBrokerResponseData;

      if (suggestionData?.text) {
        setAssessmentId(assessmentId);

        const message: AiBrokerChatQuestion[] = [
          {
            id: nanoid(),
            type: AiBrokerMessageType.question,
            position: 'left',
            ...suggestionData,
          },
        ];

        withReset ? setChatItem(message, assessmentId) : addChatItem(message);
      }
    });
  };

  const handleAnswer = (answer: AssessmentAnswer) => {
    if (!brokerHistory.assessmentId) {
      return;
    }

    mutateAsync({
      data: { assessment_id: brokerHistory.assessmentId, answer: answer.text },
    }).then((data) => {
      if (!data.data.ok) {
        addChatItem([
          {
            id: nanoid(),
            type: AiBrokerMessageType.error,
            position: 'left',
            content: 'Unknown error',
          },
        ]);
        return;
      }

      if (lastMessage?.type === AiBrokerMessageType.question) {
        track.event(AnalyticsEvent.AiBrokerSuggestionAnswer, {
          assessmentId: brokerHistory.assessmentId,
          question: lastMessage.text,
          answer: answer.text,
        });
      }

      const suggestionData = data.data.data as AIBrokerResponseData;

      if (suggestionData?.text) {
        addChatItem([
          {
            id: nanoid(),
            type: AiBrokerMessageType.answer,
            position: 'right',
            content: answer.text,
          },
          {
            id: nanoid(),
            type: AiBrokerMessageType.question,
            position: 'left',
            ...suggestionData,
          },
        ]);
      }

      const finalResponse = data.data as AIBrokerFinalResponse;

      if (Array.isArray(finalResponse?.recommended_funds)) {
        track.event(AnalyticsEvent.AiBrokerFunds, {
          funds: finalResponse.recommended_funds,
        });

        addChatItem([
          {
            id: nanoid(),
            type: AiBrokerMessageType.answer,
            position: 'right',
            content: answer.text,
          },
          ...((finalResponse.recommended_funds.length > 0
            ? [
                {
                  id: nanoid(),
                  type: AiBrokerMessageType.selectFund,
                  position: 'left',
                  content: finalResponse.text,
                  funds: finalResponse.recommended_funds,
                },
              ]
            : [
                {
                  id: nanoid(),
                  type: AiBrokerMessageType.error,
                  position: 'left',
                  content:
                    'It looks like we couldn’t find suitable investment options matching your criteria at the moment. However, our AI model is constantly analyzing new opportunities. You can check back later, or adjust your preferences to explore a wider range of funds.',
                },
              ]) as AiBrokerChatType[]),
        ]);
      }
    });
  };

  const isStartedChat = brokerHistory.assessmentId;

  const selectedFund = brokerHistory.chat.find(
    (message) => message.type === AiBrokerMessageType.selectedFund,
  )?.fund;

  const isPending = isLoadingAnswer || isLoadingStart;
  return {
    isPending,
    isLoadingAnswer,
    isLoadingStart,
    isStartedChat,
    addChatItem,
    setChatItem,
    lastMessage,
    handleAnswer,
    handleStartChat,
    removeLastMessages,
    setAddress,
    selectedFund,
    isConnected,
    brokerHistory,
  };
};
