import { utils } from 'ethers';
import { useLocalStorage } from 'usehooks-ts';
import * as yup from 'yup';

import {
  AiBrokerChatType,
  AiBrokerChatWithAssessmentId,
} from '@/widgets/AiBroker/model/types';

interface AiBrokerFormValues {
  assessmentId: string;
  address: string;
  chat: AiBrokerChatWithAssessmentId[];
}

const defaultFormValues: AiBrokerFormValues = {
  assessmentId: '',
  address: '',
  chat: [],
};

export const brokerAddressSchema = yup
  .string()
  .required()
  .test((value, context) => {
    return value && !utils.isAddress(value)
      ? context.createError({
          message: 'Invalid address',
          path: 'address',
        })
      : true;
  });

export const useAiBrokerForm = () => {
  const [brokerHistory, setBrokerHistory, removeDefaultValues] =
    useLocalStorage<AiBrokerFormValues>('ai_history', defaultFormValues);

  const setAssessmentId = (assessmentId: string) =>
    setBrokerHistory((prevState) => ({ ...prevState, assessmentId }));

  const setAddress = (address: string) =>
    setBrokerHistory((prevState) => ({ ...prevState, address }));

  const setChatItem = (chat: AiBrokerChatType[], assessmentId: string) => {
    setBrokerHistory((prevState) => ({
      ...prevState,
      assessmentId,
      chat: chat.map((message) => ({
        ...message,
        assessmentId,
      })),
    }));
  };

  const addChatItem = (chat: AiBrokerChatType[], assessmentId?: string) => {
    setBrokerHistory((prevState) => {
      const chatClone = [...prevState.chat];
      chatClone.push(
        ...chat.map((message) => ({
          ...message,
          assessmentId: assessmentId ?? prevState.assessmentId,
        })),
      );

      return {
        ...prevState,
        chat: chatClone,
      };
    });

    setTimeout(() => {
      const scrollElement = document.getElementById('scroll-chat');
      if (scrollElement) {
        scrollElement.scrollTo({ top: scrollElement.scrollHeight });
      }
    }, 50);
  };

  const removeLastMessages = (count = 1) => {
    setBrokerHistory((prevState) => {
      const chatClone = [...prevState.chat];
      chatClone.splice(-count, count);

      return { ...prevState, chat: chatClone };
    });
  };

  const lastMessage = brokerHistory.chat.at(-1);

  const resetValues = () => {
    removeDefaultValues();
    setBrokerHistory({ ...defaultFormValues });
  };

  return {
    brokerHistory,
    lastMessage,
    addChatItem,
    setChatItem,
    resetValues,
    removeLastMessages,
    setAssessmentId,
    setAddress,
  };
};
