import React, { memo } from 'react';

import { Skeleton } from '@nextui-org/react';

import { SelectedTokenCrypto } from '@/entities/fund';
import { useFundWithdrawContext } from '@/features/FundWithdraw';
import { ButtonSelectToken, useSelectTokenModal } from '@/features/SelectToken';
import { getTokenAmountUsd, useWeb3ModalAccount } from '@/shared/lib';
import { Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

export const FundWithdrawHeader = memo(() => {
  const {
    setSelectedToken,
    selectedToken,
    selectedTokenId,
    isLoadingBalance,
    balance,
    vaultPrice,
    isLoadingVaultPrice,
    setAmount,
    vaultSymbol,
    defaultTokenIds,
  } = useFundWithdrawContext();

  const { openModal } = useSelectTokenModal();

  const { address } = useWeb3ModalAccount();

  const handleSelectToken = () => {
    openModal({
      selectedTokenId,
      onSelectToken: (token) => {
        setAmount('');
        setSelectedToken(token as SelectedTokenCrypto);
      },
      onlyNativeTokens: true,
      nativeTokensId: defaultTokenIds,
      disabledSelectChain: true,
    });
  };

  return (
    <div className="flex flex-col gap-[7px]">
      <ButtonSelectToken
        isDisabled={defaultTokenIds.length < 2}
        onClick={handleSelectToken}
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
            : undefined
        }
      />

      {address && (
        <div className="flex flex-row justify-between px-2.5">
          <Text textView={TextView.C4} className="flex flex-row gap-1">
            <span className="text-white/70">Available</span>
            <Skeleton
              isLoaded={!isLoadingBalance}
              className="rounded-lg dark:bg-background-tableRow"
            >
              {` ${formatUserMoney(balance)} ${vaultSymbol}`}
            </Skeleton>
          </Text>
          <Skeleton
            isLoaded={!isLoadingVaultPrice && !isLoadingBalance}
            className="rounded-lg dark:bg-background-tableRow"
          >
            <Text textView={TextView.C4} className="text-white/60">
              ≈ ${formatUserMoney(getTokenAmountUsd(balance, vaultPrice), 2)}
            </Text>
          </Skeleton>
        </div>
      )}
    </div>
  );
});
