'use client';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';

import { AvailableFunds } from '@/entities/AvailableFunds';
import { VaultStats, VaultStatsView } from '@/entities/VaultStats';
import { useWeb3ModalAccount } from '@/shared/lib';
import { ComponentWithProps, VaultResponseData } from '@/shared/types';
import {
  AlertTooltip,
  Chip,
  ChipViewType,
  Link,
  Text,
  TextView,
  TrustScore,
} from '@/shared/ui';
import { isInvalid } from '@/shared/utils';

import styles from './Vault.module.scss';

type VaultProps = {
  vault: VaultResponseData;
  userBalance?: number;
  linkClassName?: string;
  isDisabled?: boolean;
};

export const Vault: ComponentWithProps<VaultProps> = ({
  vault,
  userBalance,
  className,
  linkClassName,
  isDisabled,
}) => {
  const tokens = vault.tokens?.length ? vault.tokens : [vault.token];
  const { isConnected } = useWeb3ModalAccount();
  const [componentWidth, setComponentWidth] = React.useState<number>(0);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  const updateWidth = () => {
    if (rootRef.current) {
      setComponentWidth(rootRef.current.offsetWidth);
    }
  };

  React.useEffect(() => {
    updateWidth();

    window.addEventListener('resize', updateWidth);

    return () => {
      window.removeEventListener('resize', updateWidth);
    };
  }, []);

  return (
    <Link
      isDisabled={isDisabled}
      className={clsx(styles.link, linkClassName, 'relative overflow-hidden')}
      href={isDisabled ? '#' : `/explore/${vault.id}`}
    >
      {isDisabled && (
        <div className="z-50 absolute size-full backdrop-blur-[5px] flex items-center justify-center">
          <span className="px-2 py-1 text-black bg-white">Coming soon</span>
        </div>
      )}
      <div
        className={clsx(
          styles.root,
          componentWidth > 390 && styles.large,
          className,
        )}
        ref={rootRef}
      >
        <div className={styles.titleContainer}>
          <div className={styles.title}>
            <div className="flex flex-row gap-2">
              {tokens.map((token) => (
                <div className={styles.tokenContainer}>
                  <Image
                    className={styles.tokenicon}
                    src={token.icon ?? vault.icon}
                    alt={''}
                    width={40}
                    height={40}
                  />
                  <p className={styles.tokenName}>{token.name}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-col items-center gap-1.5">
              <AlertTooltip content={vault?.alert_text} />
              <Text textView={TextView.H4} className={styles.titleText}>
                {vault.name}
              </Text>
            </div>
          </div>

          <div className={styles.chipsContainer}>
            {vault.badges.slice(0, 1).map((badge) => (
              <Chip key={badge.name} viewType={ChipViewType.Blue}>
                {badge.name}
              </Chip>
            ))}
          </div>
        </div>
        {isConnected && !isInvalid(userBalance) && (
          <AvailableFunds
            tokenIcon={vault.icon}
            balance={userBalance}
            deposit={vault.balance_usd}
          />
        )}
        <VaultStats
          apy={vault.apy}
          cybroPoints={'20'}
          tvl={vault.tvl}
          chain={vault.chain}
          viewType={VaultStatsView.Card}
          overallVaultInvestment={vault.overall_investments_usd}
        />
        <TrustScore value={vault.trust_score} className={styles.trustScore} />
      </div>
    </Link>
  );
};
