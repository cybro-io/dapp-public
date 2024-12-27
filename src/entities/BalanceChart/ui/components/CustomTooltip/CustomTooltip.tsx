import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import { FlyoutProps } from 'victory';

import { ComponentWithProps, DashboardHistoryData } from '@/shared/types';
import { Text } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';
import { TxActionType } from '@/widgets/BalanceHistory';

import styles from './CustomTooltip.module.scss';

export const CustomTooltip: ComponentWithProps<FlyoutProps> = ({
  x,
  y,
  datum,
  className,
}) => {
  const tx = (datum as any)?.tx as DashboardHistoryData;

  const getValue = React.useCallback(() => {
    if (tx.action === TxActionType.Group) {
      return tx.size_usd[0] === '-'
        ? `$${formatUserMoney(tx.size_usd, 2)}`
        : `+$${formatUserMoney(tx.size_usd, 2)}`;
    }

    if (tx.action === TxActionType.Deposit) {
      return `+$${formatUserMoney(tx.size_usd, 2)}`;
    }

    if (tx.action === TxActionType.Withdraw) {
      return `-$${formatUserMoney(tx.size_usd, 2)}`;
    }
  }, [tx.action, tx.size_usd]);

  const getWidth = React.useCallback(() => {
    if (tx.action === TxActionType.Group) {
      return 110;
    }

    if (tx.action === TxActionType.Deposit) {
      return 140;
    }

    if (tx.action === TxActionType.Withdraw) {
      return 150;
    }
  }, [tx.action]);

  if (typeof x === 'undefined' || typeof y === 'undefined') {
    return '';
  }

  return (
    <foreignObject
      className={clsx(styles.root, className)}
      x={x - 75}
      y={y - 80}
      width={getWidth()}
      height={60}
      color={'red'}
    >
      <div className={styles.container}>
        {tx.action !== TxActionType.Group && (
          <Image src={tx.icon} width={30} height={30} alt={''} />
        )}
        <div className={styles.content}>
          <Text className={styles.title}>
            {tx.action !== TxActionType.Group ? tx.action : 'Balance:'}
          </Text>
          <Text className={styles.value}>{getValue()}</Text>
        </div>
      </div>
    </foreignObject>
  );
};
