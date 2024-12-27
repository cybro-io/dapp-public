import React, { memo } from 'react';

import { Skeleton } from '@nextui-org/react';

import {
  isAvailableFiatToken,
  useFundDepositContext,
} from '@/features/FundDeposit';
import { ButtonSelectToken, useSelectTokenModal } from '@/features/SelectToken';
import { getTokenAmountUsd, useWeb3ModalAccount } from '@/shared/lib';
import { Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

export const FundDepositHeader = memo(() => {
  const {
    setSelectedToken,
    selectedToken,
    selectedTokenId,
    isLoadingPrice,
    isLoadingBalance,
    balance,
    price,
    defaultToken,
    isSelectedDefaultToken,
    setAmount,
  } = useFundDepositContext();

  const { openModal } = useSelectTokenModal();

  const { address } = useWeb3ModalAccount();

  const handleSelectToken = () => {
    openModal({
      selectedTokenId,
      onSelectToken: (token) => {
        setAmount('');
        setSelectedToken(token);
      },
      withFiat: isAvailableFiatToken(defaultToken),
    });
  };

  return (
    <div className="flex flex-col gap-[7px]">
      <ButtonSelectToken
        onClick={handleSelectToken}
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
        <div className="flex flex-row justify-between px-2.5">
          <Text textView={TextView.C4} className="flex flex-row gap-1">
            <span className="text-white/70">Available</span>
            <Skeleton
              isLoaded={!isLoadingBalance}
              className="rounded-lg dark:bg-background-tableRow"
            >
              {` ${formatUserMoney(balance)} ${selectedToken.symbol}`}
            </Skeleton>
          </Text>
          <Skeleton
            isLoaded={!isLoadingPrice && !isLoadingBalance}
            className="rounded-lg dark:bg-background-tableRow"
          >
            <Text textView={TextView.C4} className="text-white/60">
              ≈ ${formatUserMoney(getTokenAmountUsd(balance, price), 2)}
            </Text>
          </Skeleton>
        </div>
      )}
    </div>
  );
});
