import React from 'react';

import { Skeleton } from '@heroui/react';
import Image from 'next/image';
import { useController } from 'react-hook-form';

import { AmountInput, SwapButton } from '@/shared/ui';
import { formatNumber } from '@/shared/utils';
import CybroLogo from '@assets/assets/cybro-20.svg?url';

import { useExchangeContext } from '../model/ExchangeContext';
import { ExchangeDirection } from '../model/types';

import { InputField } from './InputField';
import { InputSecondaryField } from './InputSecondaryField';

export const ExchangeDirectionSell = () => {
  const {
    paymentMethod,
    form,
    handleSwitchDirection,
    tokenBalance,
    cybroBalance,
    cybroRate,
    duration,
    receive,
    isLoadingTokenBalance,
    isLoadingCybroBalance,
    isLoadingCybroRate,
    modal,
    isLoadingCalculate,
  } = useExchangeContext();

  const { field } = useController({
    name: 'amount',
    control: form.control,
  });

  if (!paymentMethod.isCrypto) {
    return null;
  }

  return (
    <div className="flex flex-col gap-2">
      <InputSecondaryField
        currentRate={cybroRate.sell}
        duration={duration}
        isLoading={isLoadingCybroRate}
      >
        <AmountInput
          leftSection={<Image src={CybroLogo} alt="Cybro" />}
          {...field}
          label="You pay"
          rightLabelSegment={
            isLoadingCybroBalance ? (
              <Skeleton className="rounded-lg">
                <div className="h-[18px] w-20"></div>
              </Skeleton>
            ) : (
              formatNumber(cybroBalance)
            )
          }
          placeholder="0"
        />
      </InputSecondaryField>

      <SwapButton
        type="button"
        onClick={() => handleSwitchDirection(ExchangeDirection.buy)}
      />

      <InputField
        onActionClick={modal.onOpen}
        balance={
          isLoadingTokenBalance ? (
            <Skeleton className="rounded-lg">
              <div className="h-[18px] w-20"></div>
            </Skeleton>
          ) : (
            formatNumber(tokenBalance)
          )
        }
        title="To"
        tokenName={paymentMethod.name}
        tokenIcon={paymentMethod.tokenIcon}
        chainName={paymentMethod.chain.name}
        chainIcon={paymentMethod.chainIcon}
      >
        <AmountInput
          isLoading={isLoadingCalculate}
          readOnly={true}
          label="You receive"
          placeholder="0"
          value={formatNumber(receive)}
        />
      </InputField>
    </div>
  );
};
