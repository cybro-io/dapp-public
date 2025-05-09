import React from 'react';

import { Input } from '@heroui/input';
import { nanoid } from 'nanoid';

import { useFundDepositContext } from '@/features/FundDeposit';
import { AnalyticsEvent, track } from '@/shared/analytics';
import { Button, ButtonSize, ButtonView, Stack } from '@/shared/ui';
import { useAiBrokerContext } from '@/widgets/AiBroker';
import UndoIcon from '@assets/icons/undo.svg';

import { AiBrokerMessageType } from '../../model/types';
import { brokerAddressSchema } from '../../model/use-ai-broker-form';

export const AiBrokerInputAddress = () => {
  const {
    lastMessage,
    brokerHistory,
    removeLastMessages,
    setAddress,
    addChatItem,
    isConnected,
  } = useAiBrokerContext();

  const { setAmount, resetSelectedToken } = useFundDepositContext();

  const isErrorAddress =
    !brokerAddressSchema.isValidSync(brokerHistory.address) || !isConnected;

  const handleAcceptAddress = () => {
    if (isErrorAddress) {
      return;
    }

    track.event(AnalyticsEvent.AiBrokerAddressConfirm, {
      address: brokerHistory.address,
    });

    setAmount('');
    resetSelectedToken();

    addChatItem([
      {
        id: brokerHistory.address,
        type: AiBrokerMessageType.selectedAddress,
        text: brokerHistory.address,
        position: 'right',
      },
      {
        id: nanoid(),
        position: 'left',
        type: AiBrokerMessageType.selectTokenAndAmount,
      },
    ]);
  };

  const handleUndo = () => {
    removeLastMessages();
  };

  if (lastMessage?.type !== AiBrokerMessageType.selectedFund) {
    return null;
  }

  return (
    <Stack className="md:flex-row gap-2 justify-end">
      <Input
        value={brokerHistory.address}
        onValueChange={setAddress}
        isDisabled
        placeholder="Enter your wallet"
        classNames={{
          inputWrapper:
            'bg-black/80 min-h-9 h-9 group-data-[focus-visible=true]:ring-transparent',
          base: 'flex-1',
        }}
      />
      <Button
        size={ButtonSize.Small}
        onClick={handleAcceptAddress}
        disabled={isErrorAddress}
      >
        Enter
      </Button>
      <Button
        startIcon={<UndoIcon />}
        view={ButtonView.Secondary}
        size={ButtonSize.Small}
        onClick={handleUndo}
      >
        Undo
      </Button>
    </Stack>
  );
};
