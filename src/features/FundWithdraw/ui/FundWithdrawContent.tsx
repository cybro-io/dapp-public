import React, { memo } from 'react';

import { BigNumber } from 'bignumber.js';

import { useFundWithdrawContext } from '@/features/FundWithdraw';
import { AssetInput } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

export const FundWithdrawContent = memo(() => {
  const {
    selectedToken,
    priceSelectedToken,
    amount,
    balance,
    isLoadingBalance,
    isDisabledInput,
    vaultToken,
    setAmount,
    vaultTokenPriceUsd,
    receiveAmount,
    isLoadingPrice,
    sharePrice,
  } = useFundWithdrawContext();

  const onClickPercent = (value: number) => {
    if (!balance) {
      return;
    }

    setAmount(
      new BigNumber(balance)
        .multipliedBy(value)
        .dp(value === 1 ? 18 : 6)
        .toFixed(),
    );
  };

  if (!selectedToken) {
    return null;
  }

  return (
    <div className="flex flex-col gap-3">
      <AssetInput
        onClickPercent={onClickPercent}
        isDisabledPercent={!balance || isLoadingBalance}
        iconProps={{
          src: vaultToken.logoUrl,
          width: 30,
          height: 30,
          alt: vaultToken.symbol,
          subImage: {
            src: vaultToken.chain.logoUrl,
            width: 13,
            height: 13,
            alt: vaultToken.chain.name,
          },
        }}
        title="You withdraw"
        rightSegment={`≈ ${formatUserMoney(new BigNumber(amount).multipliedBy(sharePrice).multipliedBy(vaultTokenPriceUsd).dp(2, BigNumber.ROUND_DOWN).toFixed())}`}
        inputProps={{
          placeholder: '0',
          value: amount,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value),
          readOnly: isDisabledInput,
        }}
      />
      <div className="h-px w-full border-b-1 border-dashed border-stroke-tableBorder"></div>
      <AssetInput
        isLoading={isLoadingBalance || isLoadingPrice}
        iconProps={{
          src: selectedToken.logoUrl,
          width: 30,
          height: 30,
          alt: selectedToken.symbol,
          subImage: selectedToken.isCrypto
            ? {
                src: selectedToken.chain.logoUrl,
                width: 13,
                height: 13,
                alt: selectedToken.chain.name,
              }
            : undefined,
        }}
        title="You receive"
        rightSegment={`≈ ${formatUserMoney(new BigNumber(receiveAmount).multipliedBy(priceSelectedToken).dp(2, BigNumber.ROUND_DOWN).toFixed())}`}
        inputProps={{
          placeholder: '0',
          value: receiveAmount.toString(),
          readOnly: true,
        }}
      />
    </div>
  );
});
