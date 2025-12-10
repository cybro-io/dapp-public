import React from 'react';

import { SelectedToken } from '@/entities/fund';
import { AssessmentQuestion, Fund } from '@/shared/types';

export enum AiBrokerMessageType {
  question = 'question',
  answer = 'answer',
  selectFund = 'select_fund',
  selectedFund = 'selected_fund',
  selectedAddress = 'selected_address',
  selectTokenAndAmount = 'select_token_and_amount',
  selectedTokenAndAmount = 'selected_token_and_amount',
  depositProgress = 'depositProgress',
  error = 'error',
  success = 'success',
}

interface AiBrokerBaseMessage {
  id: string;
  position: 'left' | 'right';
}

export type AiBrokerChatAnswer = AiBrokerBaseMessage & {
  type: AiBrokerMessageType.answer;
  content: React.ReactNode | Array<React.ReactNode>;
};

export type AiBrokerChatQuestion = AiBrokerBaseMessage &
  AssessmentQuestion & {
    type: AiBrokerMessageType.question;
  };

export type AiBrokerChatSelectFund = AiBrokerBaseMessage & {
  funds: Fund[];
  content?: React.ReactNode;
  type: AiBrokerMessageType.selectFund;
};

export type AiBrokerChatSelectedFund = AiBrokerBaseMessage & {
  fund: Fund;
  type: AiBrokerMessageType.selectedFund;
};

export type AiBrokerChatSelectedAddress = AiBrokerBaseMessage & {
  text: string;
  type: AiBrokerMessageType.selectedAddress;
};

export type AiBrokerChatSelectTokenAndAmount = AiBrokerBaseMessage & {
  type: AiBrokerMessageType.selectTokenAndAmount;
};

export type AiBrokerChatSelectedTokenAndAmount = AiBrokerBaseMessage & {
  type: AiBrokerMessageType.selectedTokenAndAmount;
  token: SelectedToken;
  amount: string;
  amountUsd: number;
  fund: Fund;
};

export type AiBrokerChatError = AiBrokerBaseMessage & {
  content: React.ReactNode;
  type: AiBrokerMessageType.error;
};

export type AiBrokerChatSuccess = AiBrokerBaseMessage & {
  content: React.ReactNode;
  type: AiBrokerMessageType.success;
};

export type AiBrokerChatProgress = AiBrokerBaseMessage & {
  lastStep: number;
  type: AiBrokerMessageType.depositProgress;
};

export type AiBrokerChatType =
  | AiBrokerChatAnswer
  | AiBrokerChatQuestion
  | AiBrokerChatSelectFund
  | AiBrokerChatSelectedFund
  | AiBrokerChatSelectedAddress
  | AiBrokerChatSelectTokenAndAmount
  | AiBrokerChatSelectedTokenAndAmount
  | AiBrokerChatError
  | AiBrokerChatSuccess
  | AiBrokerChatProgress;

export type AiBrokerChatWithAssessmentId = AiBrokerChatType & {
  assessmentId: string;
};

export enum AiBrokerStep {
  chat,
  selectFund,
  connectWallet,
  inputAddress,
  inputAmount,
  confirmDeposit,
  successDeposit,
  errorDeposit,
}
