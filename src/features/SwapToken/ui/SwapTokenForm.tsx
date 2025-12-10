'use client';

import React from 'react';

import { Skeleton } from '@heroui/react';
import { getChainById } from '@lifi/data-types';
import { Token } from '@lifi/sdk';
import BigNumber from 'bignumber.js';
import { utils } from 'ethers';

import {
  getUniqueTokenId,
  InputAddress,
  SwapTokenCard,
} from '@/entities/SwapToken';
import { OpenSelectTokenModal } from '@/features/SelectToken';
import { SwapSettingsButton } from '@/features/SwapSettings';
import { useAppKitAccount, useGetErc20Balance } from '@/shared/lib';
import {
  Button,
  SwapButton,
  Text,
  TextView,
  AmountInput,
  Stack,
  Group,
  Typography,
  Chip,
  ChipViewType,
} from '@/shared/ui';

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

  const { address } = useAppKitAccount();

  const { isLoading: isLoadingCalculate, result } = calculateParams;
  const values = form.values;

  const { balance: balanceIn, isLoading: isLoadingInBalance } =
    useGetErc20Balance({
      walletAddress: address,
      tokenAddress: values.tokenIn?.address,
      chainId: values.tokenIn?.chainId,
    });

  const { balance: balanceOut, isLoading: isLoadingOutBalance } =
    useGetErc20Balance({
      walletAddress: address,
      tokenAddress: values.tokenOut?.address,
      chainId: values.tokenOut?.chainId,
    });

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

  if (!values.tokenIn || !values.tokenOut) {
    return null;
  }

  const chainIn = getChainById(values.tokenIn.chainId);
  const chainOut = getChainById(values.tokenOut.chainId);

  return (
    <form className="flex flex-col gap-2" onSubmit={form.handleSubmit}>
      <SwapTokenCard
        isDisabled={isDisabledInputValue}
        tokenName={values.tokenIn.symbol ?? ''}
        tokenIcon={values.tokenIn.logoURI ?? ''}
        chainName={chainIn.name}
        chainIcon={chainIn.logoURI}
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
        tokenIcon={values.tokenOut.logoURI ?? ''}
        chainName={chainOut.name}
        chainIcon={chainOut.logoURI}
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
          isLoading={isLoadingCalculate}
        />
      </SwapTokenCard>

      <div className="relative bg-button-secondary-defaultBg w-full rounded-2xl pt-4 px-1 pb-1 flex flex-col gap-4">
        {form.errors.address && (
          <Chip
            viewType={ChipViewType.Warning}
            className="absolute -top-[14px] left-0 right-0 mx-auto w-[calc(100%-32px)]"
          >
            {form.errors.address}
          </Chip>
        )}

        <Group className="gap-4 justify-between px-3">
          <Stack className="gap-2.5">
            {result && (
              <React.Fragment>
                <Group className="items-center gap-1">
                  <Typography
                    variant="caption"
                    order={1}
                    className="text-white/80"
                  >
                    Network cost
                  </Typography>
                  <Typography variant="caption" order={2}>
                    {new BigNumber(
                      result.gasCostUSD ?? 0,
                    ).isGreaterThanOrEqualTo(0.01)
                      ? `~${result.gasCostUSD}`
                      : `<$0.01`}
                  </Typography>
                </Group>
                <Group className="items-center gap-1">
                  <Typography
                    variant="caption"
                    order={1}
                    className="text-white/80"
                  >
                    Price impact
                  </Typography>
                  <Typography variant="caption" order={2}>
                    {new BigNumber(result.fromAmountUSD)
                      .minus(result.toAmountUSD)
                      .dividedBy(result.fromAmountUSD)
                      .multipliedBy(10)
                      .negated()
                      .toFixed(2)}
                    %
                  </Typography>
                </Group>
                <Group className="items-center gap-1">
                  <Typography
                    variant="caption"
                    order={1}
                    className="text-white/80"
                  >
                    Min. received
                  </Typography>
                  <Typography variant="caption" order={2}>
                    {BigNumber(
                      utils.formatUnits(
                        result.toAmountMin,
                        result.toToken.decimals,
                      ),
                    )
                      .dp(8)
                      .toFixed()}
                    &nbsp;
                    {result.toToken.symbol}
                  </Typography>
                </Group>
              </React.Fragment>
            )}
          </Stack>

          <SwapSettingsButton
            onChangeSettings={form.handleChangeSettings}
            deadline={values.deadline}
            slippage={values.slippage}
          />
        </Group>

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
