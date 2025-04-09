import React from 'react';

import { nanoid } from 'nanoid';

import { useWeb3ModalAccount } from '@/shared/lib';
import { Fund } from '@/shared/types';
import { useAiBrokerContext } from '@/widgets/AiBroker';
import { AiBrokerFundCard } from '@/widgets/AiBroker/ui/stepper/AiBrokerFundCard';

import { AiBrokerChatSelectFund, AiBrokerMessageType } from '../../model/types';

import { AiBrokerMessage } from './AiBrokerMessage';

export const MessageSelectFund = ({
  funds,
  position,
  content,
}: AiBrokerChatSelectFund) => {
  const { address } = useWeb3ModalAccount();
  const { addChatItem, setAddress, lastMessage } = useAiBrokerContext();

  const handleSelectFund = (fund: Fund) => {
    setAddress(address ?? '');
    addChatItem([
      {
        id: nanoid(),
        type: AiBrokerMessageType.selectedFund,
        position: 'left',
        fund,
      },
    ]);
  };
  return (
    <AiBrokerMessage
      position={position}
      messages={[
        content,
        ...funds.map((fund) => (
          <AiBrokerFundCard
            key={fund.id}
            fund={fund}
            onSelectFund={handleSelectFund}
            isDisabled={lastMessage?.type !== AiBrokerMessageType.selectFund}
          />
        )),
      ]}
    />
  );
};
