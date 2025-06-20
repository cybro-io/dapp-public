import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { ComponentWithProps, Money, Nullable } from '@/shared/types';
import { Button, ButtonSize, ButtonView, Text, TextView } from '@/shared/ui';
import { formatUserMoney, isInvalidNumber } from '@/shared/utils';

import styles from './AvailableFunds.module.scss';

export type AvailableFundsProps = {
  balance: Money;
  tokenIcon: Nullable<string>;
  deposit: Money;
  onButtonClick?: (...args: any) => void;
};

export const AvailableFunds: ComponentWithProps<AvailableFundsProps> = ({
  balance,
  deposit,
  tokenIcon,
  onButtonClick,
  className,
}) => {
  const userDeposit = deposit && formatUserMoney(deposit);
  const availableFunds = formatUserMoney(balance);

  const getData = React.useCallback(() => {
    if (
      userDeposit !== '0' &&
      userDeposit !== 0 &&
      !isInvalidNumber(userDeposit)
    ) {
      return {
        title: 'Your Deposit:',
        value: `$${userDeposit}`,
      };
    }

    return {
      title: 'Available Funds:',
      value: `$${availableFunds}`,
    };
  }, [availableFunds, userDeposit]);

  const { title, value } = getData();

  return (
    <div className={clsx(styles.root, className)}>
      <div className={styles.availableFundsInnerContainer}>
        <div className={styles.funds}>
          <Text className={styles.fundsTitle} textView={TextView.C3}>
            {title}
          </Text>
          <Text className={styles.fundsValue} textView={TextView.P3}>
            <span className={styles.tetherIconContainer}>
              {tokenIcon && (
                <Image src={tokenIcon} alt={''} height={16} width={16} />
              )}
            </span>
            {value}
          </Text>
        </div>
        <Button
          view={ButtonView.Secondary}
          size={ButtonSize.Small}
          className={styles.depositButton}
          onClick={onButtonClick}
        >
          Deposit
        </Button>
      </div>
    </div>
  );
};
