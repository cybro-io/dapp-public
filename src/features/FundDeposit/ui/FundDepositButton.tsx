import React, { memo } from 'react';

import { Input } from '@heroui/input';
import { Skeleton } from '@heroui/react';
import { CloseFilledIcon } from '@heroui/shared-icons';

import { FundSubmitButton } from '@/entities/fund';
import { useFundDepositContext } from '@/features/FundDeposit';
import { Group, Typography } from '@/shared/ui';
import TickCircle from '@assets/icons/tick-circle.svg';

export const FundDepositButton = memo(() => {
  const {
    submitButtonText,
    handleDeposit,
    isSelectedDefaultToken,
    isDisabledSubmit,
    referral,
  } = useFundDepositContext();

  const {
    refCode,
    setRefCode,
    isValidRefCode,
    isLoadingHasReferral,
    hasReferral,
  } = referral;

  const text = isSelectedDefaultToken ? 'Deposit' : 'Auto-convert & Deposit';

  return (
    <FundSubmitButton
      onClick={() => handleDeposit({})}
      isDisabled={isDisabledSubmit}
      topSlot={
        hasReferral ? null : (
          <Skeleton isLoaded={!isLoadingHasReferral}>
            <Group>
              <Input
                classNames={{
                  inputWrapper:
                    'bg-transparent data-[hover=true]:bg-transparent group-data-[focus=true]:bg-transparent',
                  input:
                    '!text-text-accent-yellow placeholder:text-text-accent-yellow group-data-[focus=true]:placeholder:text-white/20',
                }}
                value={refCode}
                onValueChange={setRefCode}
                placeholder="Enter referral code"
                maxLength={8}
                endContent={
                  isValidRefCode === undefined ? null : isValidRefCode ? (
                    <TickCircle />
                  ) : (
                    <Typography
                      order={3}
                      variant="poppins"
                      className="text-error-label inline-flex gap-1 items-center"
                    >
                      Incorrect
                      <CloseFilledIcon />
                    </Typography>
                  )
                }
              />
            </Group>
          </Skeleton>
        )
      }
    >
      {submitButtonText ?? text}
    </FundSubmitButton>
  );
});
