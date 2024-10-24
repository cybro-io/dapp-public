import React from 'react';

import clsx from 'clsx';
import Link from 'next/link';

import { ModalId, useModal } from '@/app/providers';
import { AvailableFunds } from '@/entities/AvailableFunds';
import { Banner, BannerColor, BannerSize } from '@/entities/Banner';
import { DepositWithdrawTabs } from '@/entities/DepositWithdraw';
import { FeeBanner } from '@/entities/FeeBanner/ui';
import { SafetyScoreDetails } from '@/entities/SafetyScoreDetails';
import { VaultStats, VaultStatsView } from '@/entities/VaultStats';
import { ChainToExplorerUrl, YieldSwitchOptions } from '@/shared/const';
import { useBalance } from '@/shared/hooks';
import { useWeb3ModalAccount } from '@/shared/lib';
import {
  ComponentWithProps,
  Nullable,
  Token,
  Vault,
  VaultResponseData,
} from '@/shared/types';
import {
  Button,
  ButtonSize,
  ButtonView,
  ExtendedVaultSkeleton,
  LinkView,
  Text,
  TextView,
} from '@/shared/ui';
import { isInvalid } from '@/shared/utils';

import styles from './VaultInfo.module.scss';

type VaultInfoProps = {
  vault: Nullable<VaultResponseData>;
  vaultContract: Nullable<Vault>;
  tokenContract: Nullable<Token>;
  isLoading?: boolean;
};

export const VaultInfo: ComponentWithProps<VaultInfoProps> = ({
  vault,
  vaultContract,
  tokenContract,
  isLoading = false,
  className,
}) => {
  const { openModal } = useModal();
  const { isConnected, chainId } = useWeb3ModalAccount();
  const { balance, vaultDepositUsd } = useBalance(
    tokenContract,
    vaultContract,
    vault?.chain_id,
    vault?.token?.name,
  );
  const [activeTab, setActiveTab] = React.useState<any>(
    YieldSwitchOptions.Deposit,
  );

  const modalProps = React.useMemo(() => {
    return {
      activeTab,
      vaultId: vault?.id,
      currency: vault?.token.name,
      vaultContract,
      tokenContract,
      tokenIcon: vault?.icon,
      apy: vault?.apy,
      userDeposit: vaultDepositUsd,
      chainId: vault?.chain_id,
      chain: vault?.chain,
      tokens: vault?.tokens?.length ? vault.tokens : [vault?.token],
      fundType: vault?.fund_type ?? 'unknown',
    };
  }, [
    activeTab,
    vault?.id,
    vault?.token,
    vault?.icon,
    vault?.apy,
    vault?.chain_id,
    vault?.chain,
    vaultContract,
    tokenContract,
    vaultDepositUsd,
  ]);

  const onTabChange = React.useCallback(
    (activeTab: YieldSwitchOptions) => {
      openModal(ModalId.YieldCalculator, { ...modalProps, activeTab });
      setActiveTab(activeTab);
    },
    [modalProps, openModal],
  );

  return (
    <div className={clsx(styles.root, className)}>
      <section className={styles.vaultStatsContainer}>
        {isConnected && !isInvalid(balance) && (
          <AvailableFunds
            className={styles.availableFunds}
            balance={balance}
            deposit={vaultDepositUsd}
            tokenIcon={vault?.icon}
            onButtonClick={() =>
              openModal(ModalId.YieldCalculator, {
                ...modalProps,
                activeTab: YieldSwitchOptions.Deposit,
              })
            }
          />
        )}
        <VaultStats
          className={styles.vaultStatsMobile}
          viewType={VaultStatsView.Card}
          apy={vault?.apy}
          cybroPoints={'20'}
          tvl={vault?.tvl}
          provider={vault?.provider.name}
          tokenIcon={vault?.icon}
          yourDeposit={vaultDepositUsd}
          isLoading={isLoading}
          overallVaultInvestment={vault?.overall_investments_usd}
        />
        <VaultStats
          className={styles.vaultStatsDesktop}
          viewType={VaultStatsView.Full}
          apy={vault?.apy}
          cybroPoints={'20'}
          tvl={vault?.tvl}
          provider={vault?.provider.name}
          availableFunds={isConnected && !isInvalid(balance) ? balance : null}
          tokenIcon={vault?.icon}
          yourDeposit={vaultDepositUsd}
          isLoading={isLoading}
          overallVaultInvestment={vault?.overall_investments_usd}
        />
      </section>
      <FeeBanner className={styles.feeBanner} />

      {vault?.provider.description && (
        <section className={styles.providerDescription}>
          <Text
            className={clsx(styles.title, styles.providerDescriptionTitle)}
            textView={TextView.H3}
          >
            Provider Description
          </Text>
          <Text className={styles.description} textView={TextView.P2}>
            {vault.provider.description}
          </Text>
        </section>
      )}

      <SafetyScoreDetails
        vaultId={vault?.id}
        trustScore={vault?.trust_score}
        auditor={vault?.auditors[0]}
        className={styles.safetyScoreDetails}
        isLoading={isLoading}
      />
      {isLoading ? (
        <ExtendedVaultSkeleton />
      ) : (
        <React.Fragment>
          <section className={styles.extendedVaultDescription}>
            <Text className={styles.title} textView={TextView.H3}>
              Extended Vault Description
            </Text>
            <Text className={styles.description} textView={TextView.P2}>
              {vault?.description}
            </Text>
            {!isInvalid(vault?.chain_id) && vaultContract?.address && (
              <Link
                href={`${ChainToExplorerUrl[vault?.chain_id]}/address/${vaultContract.address}`}
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
            )}
          </section>
          <section className={styles.yieldCalculator}>
            <Banner
              className={styles.yieldBanner}
              color={BannerColor.Accent}
              size={BannerSize.BigMobile}
              title="Yield Calculator"
              description="You're ready to go! Invite friends using your unique referral link and earn CYBRO Points"
              Button={
                <Button
                  className={styles.yieldButton}
                  view={ButtonView.Secondary}
                  onClick={() => openModal(ModalId.YieldCalculator, modalProps)}
                >
                  Calculate Yield
                </Button>
              }
              caption="Cybro boost faq"
              captionType={LinkView.Tooltip}
            />
          </section>
          <DepositWithdrawTabs
            activeTab={activeTab}
            setActiveTab={onTabChange}
            className={styles.depositWithdrawTabs}
            size={'sm'}
          />
        </React.Fragment>
      )}
    </div>
  );
};
