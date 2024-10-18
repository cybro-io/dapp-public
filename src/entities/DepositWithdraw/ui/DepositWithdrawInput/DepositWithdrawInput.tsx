'use client';

import React from 'react';

import { LiFiStep } from '@lifi/sdk';
import { Skeleton } from '@nextui-org/react';
import clsx from 'clsx';
import { utils } from 'ethers';
import Image from 'next/image';
import { Token } from 'symbiosis-js-sdk';

import { getUniqueTokenId } from '@/entities/SwapToken';
import { useSelectTokenModal } from '@/features/SelectToken';
import { track, AnalyticsEvent } from '@/shared/analytics';
import { YieldSwitchOptions } from '@/shared/const';
import {
  ComponentWithProps,
  Maybe,
  Money,
  TokenResponseData,
} from '@/shared/types';
import { DropdownButton, Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import styles from './DepositWithdrawInput.module.scss';

type DepositWithdrawInputProps = {
  vaultCurrency: string;
  currency: string;
  tokenIcon: string;
  userValue: Maybe<string>;
  userValueUsd: Maybe<Money>;
  setUserValue: (event: React.ChangeEvent<HTMLInputElement>) => void;
  activeTab: string | number;
  chain: string;
  userBalance: Money | string;
  availableFunds?: Money;
  availableFundsUsd?: Money;
  selectedPercent: number | null;
  setSelectedPercent: (value: number | null) => void;
  selectedToken: Token | null;
  setSelectedToken: (token: Token | null) => void;
  isLoadingCalculate: boolean;
  isLoadingSwap: boolean;
  swapCalculate: LiFiStep | null;
  chainId: number;
  tokenAddress: string;
  tokens: TokenResponseData[];
  withSwap: boolean;
};

const isActiveZapIn = process.env.NEXT_PUBLIC_ZAP_IN_ON === 'true';

export const percentButtons = [
  {
    title: '5%',
    value: 0.05,
  },
  {
    title: '25%',
    value: 0.25,
  },
  {
    title: '50%',
    value: 0.5,
  },
  {
    title: '75%',
    value: 0.75,
  },
  {
    title: 'Max',
    value: 1,
  },
];

export const DepositWithdrawInput: ComponentWithProps<
  DepositWithdrawInputProps
> = ({
  currency,
  tokenIcon,
  userValue,
  userValueUsd,
  setUserValue,
  chain,
  activeTab,
  userBalance,
  availableFunds,
  availableFundsUsd,
  selectedPercent,
  setSelectedPercent,
  className,
  setSelectedToken,
  selectedToken,
  swapCalculate,
  isLoadingCalculate,
  chainId,
  tokenAddress,
  isLoadingSwap,
  tokens,
  withSwap,
  vaultCurrency,
}) => {
  const getData = React.useCallback(() => {
    if (activeTab === YieldSwitchOptions.Deposit) {
      return {
        availableFundsValue: formatUserMoney(userBalance),
        availableFundsValueUsd: formatUserMoney(availableFundsUsd),
      };
    }

    return {
      availableFundsValue: formatUserMoney(availableFunds),
      availableFundsValueUsd: formatUserMoney(availableFundsUsd),
    };
  }, [activeTab, userBalance, availableFunds, availableFundsUsd]);

  const { availableFundsValue, availableFundsValueUsd } = getData();

  const numberInputOnWheelPreventChange = (event: any) => {
    // Prevent the input value change
    event.target.blur();

    // Prevent the page/container scrolling
    event.stopPropagation();

    setTimeout(() => {
      event.target.focus();
    }, 0);
  };

  const { openModal } = useSelectTokenModal();

  const handleSelectToken = () => {
    track.event(AnalyticsEvent.ChangeZapInToken);

    openModal({
      selectedTokenId: selectedToken
        ? getUniqueTokenId(selectedToken.address, selectedToken.chainId)
        : getUniqueTokenId(tokenAddress, chainId),
      onSelectToken: (token) => {
        track.event(AnalyticsEvent.ChangeZapInTokenSuccess);
        setSelectedToken(
          tokenAddress === token.address && chainId === token.chainId
            ? null
            : token,
        );
      },
      nativeTokensId: tokens.map((token) =>
        getUniqueTokenId(token.address, chainId),
      ),
      onlyNativeTokens:
        !isActiveZapIn || activeTab === YieldSwitchOptions.Withdraw,
    });
  };

  const isSelectedToken = !!selectedToken;

  const isDisabledPercent = !Number(availableFundsValue);

  React.useEffect(() => {
    setSelectedPercent(null);
  }, [activeTab]);

  return (
    <div className={clsx(styles.calculator, className)}>
      <div className={styles.userInfo}>
        <div className={styles.availableFunds}>
          <Text className={styles.title} textView={TextView.C3}>
            Available Funds
          </Text>
          <div className="flex flex-row gap-1 items-center">
            <Text className={styles.value} textView={TextView.P1}>
              {availableFundsValue}
            </Text>
            <Text className={styles.asset} textView={TextView.C3}>
              {activeTab === YieldSwitchOptions.Deposit
                ? isSelectedToken
                  ? selectedToken?.symbol
                  : currency
                : vaultCurrency}
            </Text>
          </div>

          <Text className={styles.equal} textView={TextView.C3}>
            ≈ ${availableFundsValueUsd}
          </Text>
        </div>
        <div className={styles.currentToken}>
          <Text className={styles.title} textView={TextView.C3}>
            Current Token
          </Text>
          <div className={styles.value}>
            <div className={styles.iconContainer}>
              <Image
                src={selectedToken?.icons?.small ?? tokenIcon}
                alt={''}
                height={24}
                width={24}
              />
            </div>
            <div className={styles.tokenValue}>
              <Text className={styles.value} textView={TextView.P1}>
                {isSelectedToken ? selectedToken.symbol : currency}
              </Text>
              <Text className={styles.network} textView={TextView.C3}>
                On {isSelectedToken ? String(selectedToken.chain?.name) : chain}
              </Text>
            </div>
          </div>

          <DropdownButton
            className="w-fit absolute right-0 left-0 mx-auto bottom-[-22px]"
            type="button"
            onClick={handleSelectToken}
            disabled={isLoadingCalculate || isLoadingSwap}
          >
            Change
          </DropdownButton>
        </div>
      </div>
      <div className={styles.userInput}>
        <div className="flex flex-row justify-between">
          <Text className={styles.label} textView={TextView.C3}>
            Entry Amount
          </Text>
          {withSwap && (
            <div className="flex flex-row gap-1 items-center">
              <Image
                src={tokenIcon}
                alt={''}
                height={13}
                width={13}
                className="size-[13px]"
              />

              {isLoadingCalculate ? (
                <Skeleton
                  classNames={{
                    base: 'rounded-lg w-6 h-[18px] dark:bg-background-tableRow',
                  }}
                />
              ) : (
                <Text textView={TextView.C4}>
                  {formatUserMoney(
                    utils.formatUnits(swapCalculate?.estimate.toAmount ?? '0'),
                  )}
                </Text>
              )}
            </div>
          )}
        </div>

        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            value={userValue}
            type="number"
            onChange={setUserValue}
            placeholder={'0'}
            onWheel={numberInputOnWheelPreventChange}
            disabled={isLoadingCalculate || isLoadingSwap}
          />
          <span className={styles.equal}>
            ≈ ${formatUserMoney(userValueUsd)}
          </span>
        </div>
        <div className={styles.percentButtons}>
          {percentButtons.map(({ title, value }) => {
            return (
              <button
                key={value}
                className={clsx(
                  styles.percentButton,
                  value === selectedPercent && styles.percentButtonSelected,
                )}
                disabled={
                  isDisabledPercent || isLoadingCalculate || isLoadingSwap
                }
                onClick={() =>
                  setSelectedPercent(value === selectedPercent ? null : value)
                }
              >
                {title}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
