import React from 'react';

import { Spinner } from '@heroui/react';

import { useFundDepositContext } from '@/features/FundDeposit';
import { Typography } from '@/shared/ui';
import { useAiBrokerContext } from '@/widgets/AiBroker';
import {
  AiBrokerChatProgress,
  AiBrokerMessageType,
} from '@/widgets/AiBroker/model/types';
import { AiBrokerMessage } from '@/widgets/AiBroker/ui/message/AiBrokerMessage';
import TickCircle from '@assets/icons/tick-circle.svg';

export const MessageProgress = ({
  id,
  position,
  assessmentId,
}: AiBrokerChatProgress & { assessmentId: string }) => {
  const { lastMessage, brokerHistory } = useAiBrokerContext();
  const { isProcessing, step, statuses } = useFundDepositContext();

  const isHasErrorMessage = Boolean(
    brokerHistory.chat.find(
      (message) =>
        message.type === AiBrokerMessageType.error &&
        message.assessmentId === assessmentId,
    ),
  );

  const currentStep =
    lastMessage?.id === id && isProcessing
      ? step
      : isHasErrorMessage
        ? -1
        : 999;

  return (
    <AiBrokerMessage
      position={position}
      userIcon={position === 'right' ? null : undefined}
      messages={[
        'Processing your transaction… This may take around 30 seconds.',
      ]}
    >
      <div className="flex flex-col">
        {statuses.map((status, index) => (
          <div
            key={status}
            className="inline-flex gap-1 items-center px-0.5 py-1"
          >
            <Typography
              variant="caption"
              order={4}
              className="flex-1 text-white/60"
            >
              {status}
            </Typography>
            {index === currentStep && (
              <Spinner color="warning" classNames={{ wrapper: '!size-3' }} />
            )}
            {currentStep !== -1 && index < currentStep && <TickCircle />}
          </div>
        ))}
      </div>
    </AiBrokerMessage>
  );
};
