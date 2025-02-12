import React, { memo } from 'react';

import { BigNumber } from 'bignumber.js';

import { useFundDepositContext } from '@/features/FundDeposit';
import { getTokenAmountUsd } from '@/shared/lib';
import { AssetInput } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

export const FundDepositContent = memo(() => {
  const {
    selectedToken,
    price,
    amount,
    balance,
    isLoadingBalance,
    isDisabledInput,
    isSelectedDefaultToken,
    defaultToken,
    setAmount,
    receivedAmount,
    isLoadingCalculate,
    priceDefaultToken,
  } = useFundDepositContext();

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

  return (
    <div className="flex flex-col gap-3">
      <AssetInput
        onClickPercent={selectedToken.isCrypto ? onClickPercent : undefined}
        isDisabledPercent={!balance || isLoadingBalance}
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
        title="You pay"
        rightSegment={`≈ ${formatUserMoney(getTokenAmountUsd(amount, price))}`}
        inputProps={{
          placeholder: '0',
          value: amount,
          onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
            setAmount(e.target.value),
          readOnly: isDisabledInput,
        }}
      />
      {!isSelectedDefaultToken && (
        <React.Fragment>
          <div className="h-px w-full border-b-1 border-dashed border-stroke-tableBorder"></div>
          <AssetInput
            isLoading={isLoadingCalculate}
            iconProps={{
              src: defaultToken.logoUrl,
              width: 30,
              height: 30,
              alt: defaultToken.symbol,
              subImage: {
                src: defaultToken.chain.logoUrl,
                width: 13,
                height: 13,
                alt: defaultToken.chain.name,
              },
            }}
            title="You deposit"
            rightSegment={`≈ ${formatUserMoney(getTokenAmountUsd(receivedAmount, priceDefaultToken))}`}
            inputProps={{
              placeholder: '0',
              value: receivedAmount,
              readOnly: true,
            }}
          />
        </React.Fragment>
      )}
    </div>
  );
});
