import React from 'react';

import { ConnectWallet } from '@/features/ConnectWallet';
import { useAppKitAccount } from '@/shared/lib';
import { useAiBrokerContext } from '@/widgets/AiBroker';
import { AiBrokerMessageBubble } from '@/widgets/AiBroker/ui/message/AiBrokerMessageBubble';
import { AiBrokerFundCard } from '@/widgets/AiBroker/ui/stepper/AiBrokerFundCard';

import { AiBrokerChatSelectedFund } from '../../model/types';

import { AiBrokerMessage } from './AiBrokerMessage';

export const MessageSelectedFund = ({
  fund,
  position,
}: AiBrokerChatSelectedFund) => {
  const { setAddress } = useAiBrokerContext();
  const { isConnected } = useAppKitAccount();

  return (
    <AiBrokerMessage
      position={position}
      messages={[
        <AiBrokerFundCard key={fund.id} fund={fund} isDisabled />,
        isConnected ? null : (
          <AiBrokerMessageBubble color="light">
            Great choice! To continue, enter or connect your wallet.
          </AiBrokerMessageBubble>
        ),
        <ConnectWallet
          onWalletConnect={(address) => {
            setAddress(address);
          }}
          className="w-fit"
          key="connect_wallet"
          whenConnectedComponent={
            <AiBrokerMessageBubble color="light">
              Great choice! Your connected wallet address is shown below. You
              can proceed with this wallet or change it if needed:
            </AiBrokerMessageBubble>
          }
        />,
      ]}
    />
  );
};
