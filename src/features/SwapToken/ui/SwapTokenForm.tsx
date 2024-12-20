'use client';

import React from 'react';

import { Skeleton } from '@nextui-org/react';
import { Token } from 'symbiosis-js-sdk';

import {
  getUniqueTokenId,
  InputAddress,
  SwapTokenCard,
} from '@/entities/SwapToken';
import { OpenSelectTokenModal } from '@/features/SelectToken';
import { SwapSettingsButton } from '@/features/SwapSettings';
import { useExchangeTokenBalance } from '@/features/SwapToken/model/useExchangeTokenBalance';
import { useWeb3ModalAccount } from '@/shared/lib';
import {
  Button,
  Chip,
  ChipViewType,
  SwapButton,
  Text,
  TextView,
} from '@/shared/ui';
import { AmountInput } from '@/shared/ui/AmountInput';

import { useExchangeSwap } from '../model/useExchangeSwap';

type SwapTokenProps = {
  features: {
    connectWallet: React.ReactElement;
    selectToken: (data: OpenSelectTokenModal) => void;
  };
};

const SwapTokenForm = ({ features }: SwapTokenProps) => {
  const {
    form,
    isConnected,
    isDisabledSubmit,
    isDisabledInputValue,
    amountOutUsd,
    amountInUsd,
    calculateParams,
    findToken,
  } = useExchangeSwap();

  const { address } = useWeb3ModalAccount();

  const { isLoadingCalculate, records, error } = calculateParams;
  const values = form.values;

  const { balance: balanceIn, isLoading: isLoadingInBalance } =
    useExchangeTokenBalance(values.tokenIn);
  const { balance: balanceOut, isLoading: isLoadingOutBalance } =
    useExchangeTokenBalance(values.tokenOut);

  const isInsufficientBalance =
    Number(values.amountIn ?? 0) > Number(balanceIn ?? 0);

  const showSelectTokenModal = (
    token: Token | null,
    setToken: (token: Token) => void,
  ) => {
    if (!token) return;

    features.selectToken({
      selectedTokenId: getUniqueTokenId(token.address, token.chainId),
      onSelectToken: (selectedToken) => {
        if (!selectedToken.isCrypto) {
          return;
        }

        const token = findToken(selectedToken.address, selectedToken.chain.id);
        if (token) {
          setToken(token);
        }
      },
    });
  };

  return (
    <form className="flex flex-col gap-2" onSubmit={form.handleSubmit}>
      <SwapTokenCard
        isDisabled={isDisabledInputValue}
        tokenName={values.tokenIn.symbol ?? ''}
        tokenIcon={values.tokenIn.icons?.small ?? ''}
        chainName={values.tokenIn.chain?.name}
        chainIcon={values.tokenIn.chain?.icons?.small}
        balance={
          isLoadingInBalance ? (
            <Skeleton className="rounded-lg">
              <div className="h-[18px] w-20 rounded-lg"></div>
            </Skeleton>
          ) : (
            balanceIn
          )
        }
        onActionClick={() =>
          showSelectTokenModal(values.tokenIn, (token) =>
            form.handleChangeToken(token, 'in'),
          )
        }
        title="From"
        footer={
          <div className="flex flex-row justify-between items-center">
            <Text textView={TextView.C4} className="opacity-60">
              Sender
            </Text>
            <Text textView={TextView.BP3}>Current Wallet</Text>
          </div>
        }
        isShowFooter={Boolean(address)}
      >
        <AmountInput
          placeholder="0"
          label="You send"
          {...form.register('amountIn')}
          usd={amountInUsd}
          max={balanceIn}
          showPercent
          readOnly={isDisabledInputValue}
          onSelectPercent={(percent) =>
            form.handleSetPercent(Number(balanceIn), percent)
          }
        />
      </SwapTokenCard>
      <SwapButton
        type="button"
        disabled={isDisabledInputValue}
        onClick={form.handleSwapDirection}
      />
      <SwapTokenCard
        isDisabled={isDisabledInputValue}
        tokenName={values.tokenOut.symbol ?? ''}
        tokenIcon={values.tokenOut.icons?.small ?? ''}
        chainName={values.tokenOut.chain?.name}
        chainIcon={values.tokenOut.chain?.icons?.small}
        balance={
          isLoadingOutBalance ? (
            <Skeleton className="rounded-lg">
              <div className="h-[18px] w-24 rounded-lg"></div>
            </Skeleton>
          ) : (
            balanceOut
          )
        }
        onActionClick={() =>
          showSelectTokenModal(values.tokenOut, (token) =>
            form.handleChangeToken(token, 'out'),
          )
        }
        title="To"
        footer={
          <div className="flex flex-row justify-between items-center">
            <Text textView={TextView.C4} className="opacity-60">
              Recipient
            </Text>
            <div className="max-w-[194px]">
              <InputAddress
                {...form.register('address')}
                onClear={() => form.setAddress('')}
                disabled={isDisabledInputValue}
              />
            </div>
          </div>
        }
        isShowFooter={Boolean(address)}
      >
        <AmountInput
          label="You recieve"
          placeholder="0"
          {...form.register('amountOut')}
          disabled
          usd={amountOutUsd}
          max={balanceOut}
        />
      </SwapTokenCard>

      <div className="relative bg-button-secondary-defaultBg w-full rounded-2xl pt-4 px-1 pb-1 flex flex-col gap-4">
        {error && (
          <Chip
            viewType={ChipViewType.Warning}
            className="absolute -top-[14px] left-0 right-0 mx-auto w-[calc(100%-32px)]"
          >
            {error}
          </Chip>
        )}

        <div className="flex flex-row gap-4 justify-between px-3">
          <div className="flex flex-col gap-2.5">
            {Object.values(records).map(({ title, value }) => (
              <div key={title} className="inline-flex items-center gap-1">
                <Text textView={TextView.C1} className="opacity-80">
                  {title}
                </Text>
                <Text textView={TextView.C2}>{value}</Text>
              </div>
            ))}
          </div>

          <SwapSettingsButton
            onChangeSettings={form.handleChangeSettings}
            deadline={values.deadline}
            slippage={values.slippage}
          />
        </div>

        {isConnected && (
          <Button
            disabled={isDisabledSubmit || isInsufficientBalance}
            type="submit"
          >
            {isLoadingCalculate ? 'Finding best rates...' : 'Swap'}
          </Button>
        )}
        {!isConnected && features.connectWallet}
      </div>
    </form>
  );
};

export default SwapTokenForm;
