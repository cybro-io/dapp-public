import React from 'react';

import { nanoid } from 'nanoid';

import { useFundDepositContext } from '@/features/FundDeposit';
import { AnalyticsEvent, track } from '@/shared/analytics';
import { Button, ButtonSize, ButtonView, Group } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';
import { useAiBrokerContext } from '@/widgets/AiBroker';
import UndoIcon from '@assets/icons/undo.svg';

import { AiBrokerMessageType } from '../../model/types';

export const AiBrokerConfirmDeposit = () => {
  const {
    isDisabledSubmit,
    handleDeposit,
    amount,
    selectedToken,
    setAmount,
    setSelectedToken,
    withOnRampDeposit,
  } = useFundDepositContext();

  const { brokerHistory, lastMessage, addChatItem, removeLastMessages } =
    useAiBrokerContext();

  React.useEffect(() => {
    const message = brokerHistory.chat.find(
      (message) => message.type === AiBrokerMessageType.selectedTokenAndAmount,
    );

    if (message) {
      setAmount(message.amount);
      setSelectedToken(message.token);
    }
  }, []);

  const handleUndo = () => {
    removeLastMessages(2);
    setAmount('');
  };

  const handeAccept = () => {
    track.event(
      withOnRampDeposit
        ? AnalyticsEvent.AiBrokerProceed
        : AnalyticsEvent.AiBrokerConfirmDeposit,
      { amount, selectedToken, address: brokerHistory.address },
    );

    handleDeposit({
      withResetAmount: false,
      onPrepareDeposit: () => {
        addChatItem([
          {
            id: nanoid(),
            type: AiBrokerMessageType.answer,
            position: 'right',
            content: 'Confirmed',
          },
          {
            id: nanoid(),
            type: AiBrokerMessageType.depositProgress,
            position: 'left',
            lastStep: 0,
          },
        ]);
      },
      onErrorDeposit: (reason) => {
        if (reason === 'on_close_munzen') {
          return;
        }

        addChatItem([
          {
            id: nanoid(),
            type: AiBrokerMessageType.error,
            position: 'left',
            content: 'Something went wrong. Please try again.',
          },
        ]);
      },
      onSuccessDeposit: () => {
        addChatItem([
          {
            id: nanoid(),
            type: AiBrokerMessageType.success,
            position: 'left',
            content: `Success! Your deposit of ${formatUserMoney(amount)} ${selectedToken?.symbol} has been sent to the fund.`,
          },
        ]);
      },
    });
  };

  if (lastMessage?.type !== AiBrokerMessageType.selectedTokenAndAmount) {
    return null;
  }

  return (
    <Group className="gap-2 flex-nowrap justify-end">
      <Button
        size={ButtonSize.Small}
        disabled={isDisabledSubmit}
        onClick={handeAccept}
      >
        {withOnRampDeposit ? 'Proceed' : 'Confirm deposit'}
      </Button>
      <Button
        startIcon={<UndoIcon />}
        view={ButtonView.Secondary}
        size={ButtonSize.Small}
        onClick={handleUndo}
      >
        Undo
      </Button>
    </Group>
  );
};
