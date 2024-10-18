'use client';

import React from 'react';

import { Skeleton } from '@nextui-org/react';
import Image from 'next/image';

import { useWeb3ModalAccount } from '@/shared/lib';
import { DropdownButton, Text, TextView } from '@/shared/ui';

import { Balance } from './Balance';
import styles from './SwapTokenCard.module.scss';
import { Title } from './Title';

export type SwapTokenCardProps = React.PropsWithChildren & {
  tokenName?: string;
  tokenIcon?: string;
  chainName?: string;
  chainIcon?: string;

  onActionClick: () => void;
  title?: React.ReactNode;
  balance?: React.ReactNode;
  footer?: React.ReactNode;
  isDisabled?: boolean;
  actionName?: string;
  isShowFooter?: boolean;
};

export const SwapTokenCard = ({
  title,
  balance,
  onActionClick,
  children,
  footer,
  isDisabled,
  actionName = 'Change token',
  isShowFooter,
  tokenIcon,
  tokenName,
  chainIcon,
  chainName,
}: SwapTokenCardProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.tokenCard} onClick={onActionClick}>
        <div className={styles.header}>
          <SwapTokenCard.Title title={title} />
          <SwapTokenCard.Balance>{balance}</SwapTokenCard.Balance>
        </div>
        <div className={styles.content}>
          <Skeleton
            isLoaded={Boolean(tokenIcon)}
            classNames={{ base: 'rounded-full' }}
          >
            <Image src={tokenIcon!} width={32} height={32} alt={tokenName!} />
          </Skeleton>
          <div className="flex flex-col gap-px">
            <Skeleton
              isLoaded={Boolean(tokenName)}
              classNames={{ base: 'rounded-lg' }}
            >
              <Text textView={TextView.BU1}>{tokenName ?? 'Token'}</Text>
            </Skeleton>
            {chainIcon && chainName && (
              <div className="inline-flex gap-[5px] items-center">
                <Image
                  className="rounded-full"
                  src={chainIcon}
                  width={14}
                  height={14}
                  alt={chainName}
                />

                <Text textView={TextView.C4} className="opacity-40">
                  On {chainName}
                </Text>
              </div>
            )}
          </div>
        </div>
        <DropdownButton
          className="w-fit absolute right-4 -bottom-4"
          type="button"
          onClick={onActionClick}
          disabled={isDisabled}
        >
          {actionName}
        </DropdownButton>
      </div>

      <div className="px-4">{children}</div>

      {isShowFooter && footer && (
        <React.Fragment>
          <div className="h-divider bg-stroke-tableBorder" />
          <div className="px-4">{footer}</div>
        </React.Fragment>
      )}
    </div>
  );
};

SwapTokenCard.Title = Title;
SwapTokenCard.Balance = Balance;
