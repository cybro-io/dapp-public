import React from 'react';

import clsx from 'clsx';

import { Banner, BannerColor, BannerSize } from '@/entities/Banner';
import { BannerT, BannerTColor, BannerTViewType } from '@/entities/BannerT';
import { JoinCommunityBanner } from '@/entities/JoinCommunityBanner';
import { Vault } from '@/entities/Vault';
import { ConnectWallet } from '@/features/ConnectWallet';
import { ReferralLink } from '@/features/ReferralLink';
import { ComponentWithProps, VaultResponseData } from '@/shared/types';
import {
  Button,
  ButtonSize,
  ButtonView,
  LinkView,
  VaultSkeleton,
} from '@/shared/ui';

import styles from './AvailableVaultsGrid.module.scss';

type AvailableVaultsGridProps = {
  vaults: VaultResponseData[];
  skeletons: number[];
  balance: Record<string, number>;
  isConnected: boolean;
  isLoading: boolean;
};

export const AvailableVaultsGrid: ComponentWithProps<
  AvailableVaultsGridProps
> = ({ vaults, skeletons, balance, isLoading, isConnected, className }) => {
  return (
    <div className={clsx(styles.vaults, className)}>
      {isLoading && skeletons.map((index) => <VaultSkeleton key={index} />)}
      {vaults.map((vault, index) => {
        if (index === 2) {
          return (
            <React.Fragment key={vault.id}>
              <BannerT
                color={BannerTColor.Dark}
                viewType={BannerTViewType.DesktopSmall}
                className={clsx(styles.pointsHunt, styles.pointsHuntDesktop)}
                title={'Join the\nPoints Hunt'}
                Button={
                  <Button
                    className={styles.pointsHuntButton}
                    size={ButtonSize.Medium}
                    onClick={() => window.open('https://cybro.io/', '_blank')}
                  >
                    Buy Cybro Tokens
                  </Button>
                }
              />
              <BannerT
                color={BannerTColor.Accent}
                viewType={BannerTViewType.Mobile}
                className={styles.referralBannerMobile}
                title="Become the&nbsp;CYBRO Evangelist"
                description="You're ready to go! Invite friends using your unique referral link and earn CYBRO Points"
                Button={
                  isConnected ? (
                    <ReferralLink />
                  ) : (
                    <ConnectWallet
                      className={styles.referralBannerButton}
                      view={ButtonView.Secondary}
                    />
                  )
                }
                linkText="Cybro points faq"
                linkHref={
                  'https://docs.cybro.io/cybro/usdcybro-token/cybro-points'
                }
              />
              <Vault vault={vault} userBalance={balance[vault.token.address]} />
            </React.Fragment>
          );
        }

        if (index === 3) {
          return (
            <React.Fragment key={vault.id}>
              <BannerT
                color={BannerTColor.Dark}
                viewType={BannerTViewType.Mobile}
                className={styles.referralBannerMobile}
                title="Join the\nPoints Hunt"
                description="You're ready to go! Invite friends using your unique referral link and earn CYBRO Points"
                Button={
                  <Button
                    className={styles.pointsHuntButton}
                    size={ButtonSize.Medium}
                    onClick={() => window.open('https://cybro.io/', '_blank')}
                  >
                    Buy Cybro Tokens
                  </Button>
                }
                linkText="watch our detailed Cybro points faq"
                linkHref={
                  'https://docs.cybro.io/cybro/usdcybro-token/cybro-points'
                }
              />

              <Vault vault={vault} userBalance={balance[vault.token.address]} />
            </React.Fragment>
          );
        }

        if (index === 5) {
          return (
            <React.Fragment key={vault.id}>
              <BannerT
                color={BannerTColor.Dark}
                viewType={BannerTViewType.DesktopLarge}
                className={styles.referralBannerDesktop}
                title="Unblock CYBRO\nPreferrals"
                description="To start racking up CYBRO Points by getting friends onboard, you'll need to grab some CYBRO tokens"
                Button={
                  isConnected ? (
                    <ReferralLink />
                  ) : (
                    <ConnectWallet
                      className={styles.referralBannerButton}
                      view={ButtonView.Secondary}
                    />
                  )
                }
                linkText="watch our detailed Cybro points faq"
                linkHref={
                  'https://docs.cybro.io/cybro/usdcybro-token/cybro-points'
                }
              />
              <Vault vault={vault} userBalance={balance[vault.token.address]} />
            </React.Fragment>
          );
        }

        if (index === vaults.length - 1) {
          return (
            <React.Fragment key={vault.id}>
              <Vault vault={vault} userBalance={balance[vault.token.address]} />
              <JoinCommunityBanner className={clsx(styles.joinBanner)} />
            </React.Fragment>
          );
        }

        return (
          <Vault
            vault={vault}
            userBalance={balance[vault.token.address]}
            key={vault.id}
          />
        );
      })}
    </div>
  );
};
