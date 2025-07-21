import React from 'react';

import { BigNumber } from 'bignumber.js';

import { formatUserMoney } from '@/shared/utils';

import { AiBrokerChatSelectedTokenAndAmount } from '../../model/types';
import { AiBrokerMessage } from '../message/AiBrokerMessage';
import { AiBrokerMessageBubble } from '../message/AiBrokerMessageBubble';

export const MessageSelectedTokenAndAmount = ({
  position,
  token,
  amount,
  fund,
}: AiBrokerChatSelectedTokenAndAmount) => {
  const withOnRamp = !token.isCrypto;
  return (
    <AiBrokerMessage
      position={position}
      userIcon={position === 'right' ? null : undefined}
      messages={[
        !withOnRamp && (
          <AiBrokerMessageBubble key="info" color="light">
            You’re about to deposit&nbsp;
            <b>
              ${formatUserMoney(amount)} ${token.symbol}
            </b>
            &nbsp;into <b>${fund.name.replaceAll('\n', '')}</b>.
          </AiBrokerMessageBubble>
        ),
        !withOnRamp && (
          <AiBrokerMessageBubble key="yield" color="light">
            <b>Expected yield:</b> +
            {new BigNumber(fund.apy).multipliedBy(100).dp(2).toString()}%
            annually
            <br />
            <b>Network:</b> ${fund.chain_name}
          </AiBrokerMessageBubble>
        ),
        withOnRamp &&
          'To complete your transaction, the Munzen widget will open to handle your transaction securely and maintain the integrity of your smart contracts. Rest assured, your information is protected.',
        withOnRamp &&
          'Once the widget appears, simply complete the form to finalize your withdraw.',
      ]}
    />
  );
};
