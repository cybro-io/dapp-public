import React from 'react';

import NiceModal from '@ebay/nice-modal-react';
import { Code } from '@nextui-org/code';
import clsx from 'clsx';
import Link from 'next/link';
import { Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { Banner, BannerColor, BannerSize } from '@/entities/Banner';
import { DepositWithdrawTabs } from '@/entities/DepositWithdraw';
import { FeeBanner } from '@/entities/FeeBanner/ui';
import { SafetyScoreDetails } from '@/entities/SafetyScoreDetails';
import { VaultStats, VaultStatsView } from '@/entities/VaultStats';
import WarningIcon from '@/shared/assets/icons/warning-icon.svg';
import { ChainToExplorerUrl, YieldSwitchOptions } from '@/shared/const';
import {
  ComponentWithProps,
  FundType,
  Nullable,
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
import { FundCalculatorModal } from '@/widgets/FundCalculator/ui/FundCalculatorModal';

import { AvailableFundsConnected } from './AvailableFundsConnected';
import styles from './VaultInfo.module.scss';

type VaultInfoProps = {
  vault: Nullable<VaultResponseData>;
  isLoading?: boolean;
};

const data01 = [
  { name: 'ZeroLend USDB', value: 10 },
  { name: 'Init Capital USDB', value: 45 },
  { name: 'Juice USDB', value: 45 },
];

export const VaultInfo: ComponentWithProps<VaultInfoProps> = ({
  vault,
  isLoading = false,
  className,
}) => {
  const vaultCalculatorModal = NiceModal.useModal(FundCalculatorModal);

  const [activeTab, setActiveTab] = React.useState<any>(
    YieldSwitchOptions.Deposit,
  );

  const onTabChange = (activeTab: YieldSwitchOptions) => {
    if (vault) {
      vaultCalculatorModal.show({
        vault,
        type: activeTab,
      });
    }

    setActiveTab(activeTab);
  };

  if (!vault) {
    return null;
  }

  return (
    <div className={clsx(styles.root, className)}>
      <section className={styles.vaultStatsContainer}>
        <AvailableFundsConnected
          className={styles.availableFunds}
          tokenAddress={vault.token.address}
          vaultAddress={vault.address}
          chainId={vault.chain_id}
          fundType={vault.fund_type as FundType}
          tokenIcon={vault?.icon}
          onButtonClick={() =>
            vaultCalculatorModal.show({ vault, type: 'deposit' })
          }
        />
        {vault.alert_text && (
          <Code
            size="lg"
            color="danger"
            className="flex flex-row gap-2 items-center px-4 py-3 mb-2"
          >
            <WarningIcon className="size-5 text-white" />
            <Text textView={TextView.P2}>{vault.alert_text}</Text>
          </Code>
        )}
        <VaultStats
          className={styles.vaultStatsMobile}
          viewType={VaultStatsView.Card}
          apy={vault?.apy}
          cybroPoints={'20'}
          tvl={vault?.tvl}
          provider={vault?.provider.name}
          tokenIcon={vault?.icon}
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
          tokenIcon={vault?.icon}
          isLoading={isLoading}
          overallVaultInvestment={vault?.overall_investments_usd}
        />
      </section>
      <FeeBanner className={styles.feeBanner} />

      <section className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={data01}
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#8884d8"
              label
            />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </section>

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
            <Link
              href={`${ChainToExplorerUrl[vault.chain_id]}/address/${vault.address}`}
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
                  onClick={() =>
                    vaultCalculatorModal.show({ vault, type: 'deposit' })
                  }
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
