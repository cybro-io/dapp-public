import React from 'react';

import { Skeleton } from '@heroui/react';

import { useFundDepositContext } from '@/features/FundDeposit';
import { ButtonSelectToken } from '@/features/SelectToken';
import { getTokenAmountUsd, useAppKitAccount } from '@/shared/lib';
import { Group, Stack, Text, TextView, Typography } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';
import { useAiBrokerContext } from '@/widgets/AiBroker';
import { AiBrokerChatSelectTokenAndAmount } from '@/widgets/AiBroker/model/types';
import { AiBrokerMessage } from '@/widgets/AiBroker/ui/message/AiBrokerMessage';

export const MessageSelectToken = ({
  position,
  id,
}: AiBrokerChatSelectTokenAndAmount) => {
  const { address } = useAppKitAccount();
  const { lastMessage } = useAiBrokerContext();
  const {
    isSelectedDefaultToken,
    selectedToken,
    setAmount,
    setSelectedToken,
    defaultToken,
    isLoadingBalance,
    isLoadingPrice,
    balance,
    price,
    handleSelectToken,
  } = useFundDepositContext();

  const isDisabledSelect = lastMessage?.id !== id;

  if (!selectedToken) {
    return null;
  }

  return (
    <AiBrokerMessage
      position={position}
      messages={[
        'How much would you like to deposit?',
        <Stack className="gap-2" key={id}>
          <ButtonSelectToken
            onClick={handleSelectToken}
            isDisabled={isDisabledSelect}
            onClearClick={
              isSelectedDefaultToken
                ? undefined
                : () => {
                    setAmount('');
                    setSelectedToken(defaultToken);
                  }
            }
            asset={{
              icon: selectedToken.logoUrl,
              name: selectedToken.symbol,
            }}
            chain={
              selectedToken.isCrypto
                ? {
                    name: selectedToken.chain.name,
                    icon: selectedToken.chain.logoUrl,
                  }
                : { name: selectedToken.name }
            }
          />

          {address && selectedToken.isCrypto && (
            <Group className="flex-nowrap gap-[5px] px-2.5">
              <Typography
                variant="caption"
                order={4}
                className="flex flex-row gap-1"
              >
                <span className="text-white/70">Available</span>
                <Skeleton
                  isLoaded={!isLoadingBalance}
                  className="rounded-lg dark:bg-background-tableRow"
                >
                  {` ${formatUserMoney(balance)} ${selectedToken.symbol}`}
                </Skeleton>
              </Typography>
              <Skeleton
                isLoaded={!isLoadingPrice && !isLoadingBalance}
                className="rounded-lg dark:bg-background-tableRow"
              >
                <Text textView={TextView.C4} className="text-white/60">
                  ≈ $
                  {formatUserMoney(
                    getTokenAmountUsd(balance, Number(price)),
                    2,
                  )}
                </Text>
              </Skeleton>
            </Group>
          )}
        </Stack>,
      ]}
    />
  );
};
