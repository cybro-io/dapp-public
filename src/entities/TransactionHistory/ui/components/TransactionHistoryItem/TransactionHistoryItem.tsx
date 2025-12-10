import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import DownIcon from '@/shared/assets/icons/chevron-up.svg';
import { getChain, useToast } from '@/shared/lib';
import { ComponentWithProps, DashboardHistoryData } from '@/shared/types';
import { IconButton, Text, TextView, ToastType } from '@/shared/ui';
import {
  formatDate,
  formatUserMoney,
  shortenWalletAddress,
} from '@/shared/utils';

import TestIcon from '../../../assets/icons/arrow-score-up.svg';
import CopyIcon from '../../../assets/icons/copy.svg';
import LinkIcon from '../../../assets/icons/maximize.svg';

import styles from './TransactionHistoryItem.module.scss';

type TransactionHistoryItemProps = {
  chainId: number;
  transaction: DashboardHistoryData;
  onHover: (transaction: string | null) => void;
  isDark?: boolean;
  isHighlighted?: boolean;
};

export const TransactionHistoryItem: ComponentWithProps<
  TransactionHistoryItemProps
> = ({
  chainId,
  transaction,
  onHover,
  isDark = false,
  isHighlighted = false,
  className,
}) => {
  const { triggerToast } = useToast();
  const [isOpened, setIsOpened] = React.useState(false);

  const onCopyClick = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(transaction.transaction_hash);
      triggerToast({
        message: 'Success',
        description: 'Tx hash was successfully copied',
      });
    } catch (e) {
      triggerToast({
        message: 'Error',
        description: 'Error copying Tx hash',
        type: ToastType.Error,
      });
    }
  }, [transaction.transaction_hash, triggerToast]);

  const chain = getChain(chainId);
  return (
    <li
      className={clsx(
        styles.root,
        isOpened && styles.opened,
        isDark && styles.dark,
        isHighlighted && styles.active,
        className,
      )}
      onMouseOver={() => onHover(transaction.transaction_hash)}
      onMouseOut={() => onHover(null)}
    >
      <div className={styles.top}>
        <div className={styles.transactionIconContainer}>
          <TestIcon />
        </div>
        <div className={styles.content}>
          <div className={styles.left}>
            <Text className={styles.heading} textView={TextView.P2}>
              {transaction.action}
            </Text>
            <Text className={styles.date} textView={TextView.C4}>
              {formatDate(transaction.transaction_ts)}
            </Text>
          </div>
          <div className={styles.right}>
            <Text className={styles.value} textView={TextView.P2}>
              ${formatUserMoney(transaction.size_usd)}
            </Text>
            <Text className={styles.fee} textView={TextView.C4}>
              Fee: $0
            </Text>
          </div>
        </div>
        <IconButton
          className={clsx(styles.downButton, isOpened && styles.isOpened)}
          icon={<DownIcon />}
          onClick={() => setIsOpened((prev) => !prev)}
        />
      </div>
      {isOpened && (
        <div className={styles.bottom}>
          <Text className={styles.sendingFrom} textView={TextView.C4}>
            TX Hash
          </Text>
          <div className={styles.detailsContainer}>
            <div className={styles.addressContainer}>
              <Text className={styles.address} textView={TextView.P2}>
                {shortenWalletAddress(transaction.transaction_hash)}
              </Text>
              <IconButton
                className={styles.copyButton}
                icon={<CopyIcon />}
                onClick={onCopyClick}
              />
            </div>
            <Link
              className={styles.explorerLink}
              href={`${chain.blockExplorers?.default.url}/tx/${transaction.transaction_hash}`}
              target="_blank"
            >
              Explorer
              <div className={styles.explorerIconContainer}>
                <LinkIcon />
              </div>
            </Link>
          </div>
        </div>
      )}
    </li>
  );
};
