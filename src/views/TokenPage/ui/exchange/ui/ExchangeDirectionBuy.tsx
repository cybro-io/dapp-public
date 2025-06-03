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

export const ExchangeDirectionBuy = () => {
  const {
    paymentMethod,
    form,
    handleSwitchDirection,
    tokenBalance,
    cybroBalance,
    isLoadingTokenBalance,
    isLoadingCybroBalance,
    cybroRate,
    duration,
    receive,
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
        title="From"
        tokenName={paymentMethod.name}
        tokenIcon={paymentMethod.tokenIcon}
        chainName={paymentMethod.chain.name}
        chainIcon={paymentMethod.chainIcon}
      >
        <AmountInput {...field} label="You pay" placeholder="0" />
      </InputField>

      <SwapButton
        type="button"
        onClick={() => handleSwitchDirection(ExchangeDirection.sell)}
      />

      <InputSecondaryField
        currentRate={cybroRate.buy}
        duration={duration}
        isLoading={isLoadingCybroRate}
      >
        <AmountInput
          isLoading={isLoadingCalculate}
          leftSection={<Image src={CybroLogo} alt="Cybro" />}
          readOnly={true}
          label="You receive"
          rightLabelSegment={
            isLoadingCybroBalance ? (
              <Skeleton className="rounded-lg data-[loaded=true]:!bg-transparent">
                <div className="h-[18px] w-20"></div>
              </Skeleton>
            ) : (
              formatNumber(cybroBalance)
            )
          }
          placeholder="0"
          value={formatNumber(receive)}
        />
      </InputSecondaryField>
    </div>
  );
};
