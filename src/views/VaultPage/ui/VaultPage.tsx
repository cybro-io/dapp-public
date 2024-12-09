'use client';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import CircleIcon from '@/entities/VaultChips/assets/icons/base-icon.svg';
import { ChainToExplorerUrl, QueryKey } from '@/shared/const';
import { useWeb3ModalAccount } from '@/shared/lib';
import {
  ComponentWithProps,
  useGetFundApiV1VaultsVaultIdGet,
} from '@/shared/types';
import {
  Chip,
  ChipSize,
  Text,
  TextView,
  VaultPageHeaderSkeleton,
  CalculatorSkeleton,
  Button,
  ButtonView,
  ButtonSize,
} from '@/shared/ui';
import { ErrorMessage } from '@/widgets/ErrorMessage';
import { FundCalculator } from '@/widgets/FundCalculator';
import { VaultInfo } from '@/widgets/VaultInfo';

import styles from './VaultPage.module.scss';

type DashboardPageProps = {
  vaultId: number;
};

export const VaultPage: ComponentWithProps<DashboardPageProps> = ({
  vaultId,
}) => {
  const { address } = useWeb3ModalAccount();

  const { data, isLoading, isError } = useGetFundApiV1VaultsVaultIdGet(
    vaultId,
    { address },
    {
      query: {
        queryKey: [QueryKey.Vault, vaultId, address],
      },
    },
  );
  const vault = data?.data?.data;
  const error = data?.data?.error;

  const isLoaded = !isLoading && vault;

  const vaultTokens = React.useMemo(() => {
    if (!vault) return [];

    return vault.tokens?.length ? vault.tokens : [vault.token];
  }, [vault]);

  const [firstLineTitle, secondLineTitle] = React.useMemo(() => {
    const vaultName = vault?.name || '';

    return vaultName.split(/\\n|\n/);
  }, [vault]);

  React.useEffect(() => {
    if (error === 'Vault not found') {
      notFound();
    }
  }, [error]);

  if (isError) {
    return <ErrorMessage className={styles.errorMessage} />;
  }

  return (
    <React.Fragment>
      {!isLoaded && <VaultPageHeaderSkeleton />}
      {isLoaded && (
        <section className={clsx(styles.heroSection)}>
          <div className="flex flex-row gap-2">
            {vaultTokens.map((token) => (
              <div className={styles.tetherContainer}>
                <Image
                  key={token.address}
                  className={styles.vaultIcon}
                  src={token.icon ?? ''}
                  alt={token.name}
                  width={87}
                  height={66}
                />

                <span className={styles.tokenName}>{token.name}</span>
              </div>
            ))}
          </div>
          <Text className={styles.heading} textView={TextView.H1}>
            <span
              className={clsx(
                styles.headingBackground,
                styles.headingBackgroundTop,
              )}
            >
              <span className={styles.accent}>{firstLineTitle}</span>
            </span>
            {secondLineTitle && (
              <React.Fragment>
                <br />
                <span className={styles.headingBackground}>
                  {secondLineTitle}
                </span>
              </React.Fragment>
            )}
          </Text>
          <Text
            textView={TextView.P3}
            className={clsx(styles.desktopDescription, styles.description)}
          >
            {vault?.description}
          </Text>
          <Text
            textView={TextView.P3}
            className={clsx(styles.mobileDescription, styles.description)}
          >
            {vault?.description}
          </Text>
          <div className={styles.chipsContainer}>
            {vault?.badges.map((badge) => (
              <Chip
                className={styles.chip}
                size={ChipSize.Large}
                key={badge.name}
              >
                {badge.icon ? (
                  <Image src={badge.icon} height={24} width={24} alt={''} />
                ) : (
                  <CircleIcon />
                )}
                {badge.value + ' ' + badge.name}
              </Chip>
            ))}
          </div>
          <Link
            className={styles.contractDetails}
            href={`${ChainToExplorerUrl[vault?.chain_id]}/address/${vault.address}`}
            target="_blank"
          >
            <Button
              className={styles.button}
              view={ButtonView.Secondary}
              size={ButtonSize.Small}
            >
              View contract details
            </Button>
          </Link>
        </section>
      )}
      <div className={styles.main}>
        <div className={styles.leftContent}>
          <VaultInfo vault={vault} isLoading={isLoading} />
        </div>
        <div className={styles.rightContent}>
          {isLoaded ? (
            <div className={styles.rightContentContainer}>
              <FundCalculator vault={vault} />
            </div>
          ) : (
            <CalculatorSkeleton />
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
