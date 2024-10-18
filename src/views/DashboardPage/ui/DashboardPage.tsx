'use client';
import React from 'react';

import { useRouter } from 'next/navigation';

import { useToast } from '@/shared/hooks';
import { useWeb3ModalAccount } from '@/shared/lib';
import { ComponentWithProps } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';
import { BalanceHistory } from '@/widgets/BalanceHistory';
import { DashboardInfo } from '@/widgets/DashboardInfo';

import styles from './DashboardPage.module.scss';

type DashboardPageProps = {};

const DashboardPage: ComponentWithProps<DashboardPageProps> = ({
  className,
}) => {
  const { isConnected, status } = useWeb3ModalAccount();
  const { triggerToast } = useToast();
  const router = useRouter();

  React.useEffect(() => {
    if (status !== 'reconnecting' && !isConnected) {
      triggerToast({
        message: 'Wallet is not connected',
        description: 'You need to connect your wallet to use the Dashboard',
      });
      router.push('/');
    }
  }, [isConnected, router, triggerToast, status]);

  if (!isConnected) {
    return null;
  }

  return (
    <div className={styles.headerContainer}>
      <Text className={styles.header} textView={TextView.H1}>
        Dashboard
      </Text>
      <DashboardInfo className={styles.dashboardInfo} />
      <BalanceHistory className={styles.balanceHistory} />
    </div>
  );
};

export default DashboardPage;
