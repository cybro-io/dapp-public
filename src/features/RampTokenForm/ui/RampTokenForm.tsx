'use client';

import React from 'react';

import { MunzenCurrency } from '@/entities/Munzen';
import { SwapTokenCard } from '@/entities/SwapToken';
import { useRamp } from '@/features/RampTokenForm';
import { Button, TextView, Text } from '@/shared/ui';

import { AmountInput } from '../../../shared/ui/inputs/AmountInput';

type ExchangeTokenProps = {
  features: {
    connectWallet: React.ReactElement;
    selectCurrency: (
      selectedCurrencyId: string,
      isCrypto: boolean,
      callback: (currency: MunzenCurrency) => void,
    ) => void;
  };
};

const RampTokenForm = ({ features }: ExchangeTokenProps) => {
  const {
    isConnected,
    rampFee,
    amountFromByUsd,
    amountToByUsd,
    isDisabledAmount,
    isDisabledSubmit,
    form,
  } = useRamp();

  const values = form.values;

  const showSelectCurrencyModal = (
    selectedCurrencyId: string,
    isCrypto: boolean,
    setCurrency: (currency: MunzenCurrency) => void,
  ) => {
    features.selectCurrency(selectedCurrencyId, isCrypto, setCurrency);
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={form.handleSubmit}>
      <SwapTokenCard
        tokenName={values.fromCurrency?.viewedTicker}
        tokenIcon={values.fromCurrency?.logoUrl}
        onActionClick={() =>
          showSelectCurrencyModal(
            values.fromCurrency?.tickerWithNetwork ?? '',
            false,
            (currency) => form.handleChangeCurrency(currency, 'from'),
          )
        }
        actionName="Change currency"
        title="From"
      >
        <AmountInput
          placeholder="0"
          label="You send"
          {...form.register('amountIn')}
          disabled={isDisabledAmount}
          usd={amountFromByUsd}
        />
      </SwapTokenCard>
      <SwapTokenCard
        tokenName={values.toCurrency?.viewedTicker}
        tokenIcon={values.toCurrency?.logoUrl}
        chainName={values.toCurrency?.blockchainNetwork ?? ''}
        onActionClick={() =>
          showSelectCurrencyModal(
            values.toCurrency?.tickerWithNetwork ?? '',
            true,
            (currency) => form.handleChangeCurrency(currency, 'to'),
          )
        }
        title="To"
      >
        <AmountInput
          label="You recieve"
          placeholder="0"
          {...form.register('amountOut')}
          disabled
          usd={amountToByUsd}
        />
      </SwapTokenCard>

      <div className="relative bg-button-secondary-defaultBg w-full rounded-2xl pt-4 px-1 pb-1 flex flex-col gap-4">
        <div className="flex flex-row gap-4 justify-between px-3">
          <div className="flex flex-col gap-2.5">
            {rampFee !== null && (
              <div className="inline-flex items-center gap-1">
                <Text textView={TextView.C1} className="opacity-80">
                  Estimated fee
                </Text>
                <Text textView={TextView.C2}>
                  {rampFee} {values.fromCurrency?.viewedTicker}
                </Text>
              </div>
            )}
          </div>
        </div>

        {isConnected && (
          <Button disabled={isDisabledSubmit} type="submit">
            Buy crypto
          </Button>
        )}
        {!isConnected && features.connectWallet}
      </div>
    </form>
  );
};

export default RampTokenForm;
