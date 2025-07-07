'use client';

import React from 'react';

import { Skeleton } from '@heroui/react';
import Image from 'next/image';

import { DropdownButton, Typography } from '@/shared/ui';

import { Balance } from './Balance';
import styles from './InputField.module.scss';
import { Title } from './Title';

export type InputFieldProps = React.PropsWithChildren & {
  tokenName?: string;
  tokenIcon?: string;
  chainName?: string;
  chainIcon?: string;

  onActionClick: () => void;
  title?: React.ReactNode;
  balance?: React.ReactNode;
  isDisabled?: boolean;
  actionName?: string;
};

export const InputField = ({
  title,
  balance,
  onActionClick,
  children,
  isDisabled,
  actionName = 'Change token',
  tokenIcon,
  tokenName,
  chainIcon,
  chainName,
}: InputFieldProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.tokenCard} onClick={onActionClick}>
        <div className={styles.header}>
          <InputField.Title title={title} />
          <InputField.Balance>{balance}</InputField.Balance>
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
              <Typography order={1} variant="unbounded">
                {tokenName ?? 'Token'}
              </Typography>
            </Skeleton>
            <div className="inline-flex gap-[5px] items-center">
              {chainIcon && chainName && (
                <Image
                  className="rounded-full"
                  src={chainIcon}
                  width={14}
                  height={14}
                  alt={chainName}
                />
              )}

              {chainName && (
                <Typography order={4} variant="caption" className="opacity-40">
                  On {chainName}
                </Typography>
              )}
            </div>
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
    </div>
  );
};

InputField.Title = Title;
InputField.Balance = Balance;
