import React from 'react';

import { useUndoApiV1AiBrokerUndoPost } from '@/shared/types';
import { Button, ButtonSize, ButtonView, Group } from '@/shared/ui';
import { useAiBrokerContext } from '@/widgets/AiBroker';
import { AiBrokerMessageType } from '@/widgets/AiBroker/model/types';
import UndoIcon from '@assets/icons/undo.svg';

export const AiBrokerUndo = () => {
  const { lastMessage, brokerHistory, removeLastMessages, isPending } =
    useAiBrokerContext();

  const { mutateAsync, isPending: isUndoPending } =
    useUndoApiV1AiBrokerUndoPost();

  const handleUndo = () => {
    if (!lastMessage) return;

    mutateAsync({ data: { assessment_id: lastMessage.assessmentId } }).then(
      () => {
        removeLastMessages(2);
      },
    );
  };

  const messagesByAssessment = brokerHistory.chat.filter(
    (message) => message.assessmentId === lastMessage?.assessmentId,
  );

  if (
    lastMessage?.type !== AiBrokerMessageType.selectFund &&
    !(
      lastMessage?.type === AiBrokerMessageType.question &&
      messagesByAssessment.length > 1
    )
  ) {
    return null;
  }

  if (lastMessage?.assessmentId !== brokerHistory.assessmentId) {
    return null;
  }

  return (
    <Group className="gap-2 flex-nowrap justify-end">
      <Button
        startIcon={<UndoIcon />}
        view={ButtonView.Secondary}
        size={ButtonSize.Small}
        onClick={handleUndo}
        isLoading={isPending || isUndoPending}
        disabled={isPending || isUndoPending}
      >
        Undo
      </Button>
    </Group>
  );
};
