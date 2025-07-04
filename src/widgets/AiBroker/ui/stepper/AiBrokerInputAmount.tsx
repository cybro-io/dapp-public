import React from 'react';

import { Input } from '@heroui/input';
import { nanoid } from 'nanoid';

import { useFundDepositContext } from '@/features/FundDeposit';
import { getTokenAmountUsd } from '@/shared/lib';
import {
  Button,
  ButtonSize,
  ButtonView,
  PercentButtons,
  Stack,
} from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';
import { useAiBrokerContext } from '@/widgets/AiBroker';
import UndoIcon from '@assets/icons/undo.svg';

import { AiBrokerMessageType } from '../../model/types';

export const AiBrokerInputAmount = () => {
  const { lastMessage, removeLastMessages, addChatItem, selectedFund } =
    useAiBrokerContext();
  const {
    amount,
    setAmount,
    isDisabledInput,
    isValidAmount,
    balance,
    isLoadingBalance,
    onClickPercent,
    selectedToken,
    isDisabledSubmit,
    submitButtonText,
    price,
  } = useFundDepositContext();

  const handleAcceptAmount = () => {
    if (isDisabledSubmit || !selectedFund || !selectedToken) {
      return;
    }

    addChatItem([
      {
        id: nanoid(),
        type: AiBrokerMessageType.answer,
        position: 'right',
        content: `${formatUserMoney(amount)} ${selectedToken.symbol} ≈ $${formatUserMoney(getTokenAmountUsd(amount, Number(price)), 2)}`,
      },
      {
        id: nanoid(),
        type: AiBrokerMessageType.selectedTokenAndAmount,
        position: 'left',
        amount,
        amountUsd: getTokenAmountUsd(amount, Number(price)),
        token: selectedToken,
        fund: selectedFund,
      },
    ]);
  };

  const handleUndo = () => {
    removeLastMessages(2);
  };

  if (
    lastMessage?.type !== AiBrokerMessageType.selectTokenAndAmount ||
    !selectedToken
  ) {
    return null;
  }

  return (
    <Stack className="gap-2">
      {selectedToken.isCrypto && (
        <PercentButtons
          isDisabled={!balance || isLoadingBalance}
          onSelectPercent={onClickPercent}
        />
      )}
      <Stack className="md:flex-row gap-2 justify-end">
        <Input
          type="number"
          value={amount}
          onChange={(event) => setAmount(event.target.value)}
          readOnly={isDisabledInput}
          placeholder="Enter manually"
          classNames={{
            inputWrapper:
              'bg-black/80 min-h-9 h-9 group-data-[focus-visible=true]:ring-transparent',
            base: 'flex-1',
          }}
          isClearable
          onClear={() => setAmount('')}
          errorMessage={submitButtonText}
          isInvalid={isDisabledSubmit}
        />
        <Button
          size={ButtonSize.Small}
          disabled={!isValidAmount}
          onClick={handleAcceptAmount}
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
    </Stack>
  );
};
