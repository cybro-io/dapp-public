import React, { memo } from 'react';

import { Skeleton } from '@heroui/react';
import { BigNumber } from 'bignumber.js';

import { SelectedTokenCrypto } from '@/entities/fund';
import { useFundWithdrawContext } from '@/features/FundWithdraw';
import { ButtonSelectToken, useSelectTokenModal } from '@/features/SelectToken';
import { useAppKitAccount } from '@/shared/lib';
import { Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

export const FundWithdrawHeader = memo(() => {
  const {
    setSelectedToken,
    selectedToken,
    selectedTokenId,
    isLoadingBalance,
    balance,
    vaultTokenPriceUsd,
    isLoadingVaultTokenPriceUsd,
    setAmount,
    vaultSymbol,
    defaultTokenIds,
    sharePrice,
  } = useFundWithdrawContext();

  const { openModal } = useSelectTokenModal();

  const { address } = useAppKitAccount();

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
      {selectedToken ? (
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
      ) : (
        <Skeleton className="rounded-[14px] w-full h-[58px] dark:bg-background-tableRow" />
      )}

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
            isLoaded={!isLoadingVaultTokenPriceUsd && !isLoadingBalance}
            className="rounded-lg dark:bg-background-tableRow"
          >
            <Text textView={TextView.C4} className="text-white/60">
              ≈ $
              {formatUserMoney(
                new BigNumber(balance)
                  .multipliedBy(sharePrice)
                  .multipliedBy(vaultTokenPriceUsd)
                  .dp(2, BigNumber.ROUND_DOWN)
                  .toNumber(),
              )}
            </Text>
          </Skeleton>
        </div>
      )}
    </div>
  );
});
