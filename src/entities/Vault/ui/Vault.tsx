'use client';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Markdown from 'react-markdown';

import { AvailableFunds } from '@/entities/AvailableFunds';
import { VaultBadgeList } from '@/entities/Vault';
import { VaultStats, VaultStatsView } from '@/entities/VaultStats';
import { useAppKitAccount } from '@/shared/lib';
import { ComponentWithProps, VaultResponseData } from '@/shared/types';
import { AlertTooltip, Link, Text, TextView, TrustScore } from '@/shared/ui';
import { isInvalidNumber } from '@/shared/utils';

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
  const { isConnected } = useAppKitAccount();
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
                <div
                  key={token.address + token.name}
                  className={styles.tokenContainer}
                >
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
              <AlertTooltip
                isVisible={Boolean(vault?.alert_text)}
                content={<Markdown>{vault?.alert_text}</Markdown>}
              />
              <Text textView={TextView.H4} className={styles.titleText}>
                {vault.name}
              </Text>
            </div>

            <VaultBadgeList
              className="gap-1.5 justify-center"
              badges={vault.badges}
            />
          </div>
        </div>
        {isConnected && !isInvalidNumber(userBalance) && (
          <AvailableFunds
            tokenIcon={vault.icon}
            balance={userBalance}
            deposit={null}
          />
        )}
        <VaultStats
          apy={vault.apy}
          cybroPoints={'20'}
          tvl={vault.tvl_brutto}
          chain={vault.chain_name}
          viewType={VaultStatsView.Card}
          overallVaultInvestment={vault.tvl_netto}
        />
        <TrustScore value={vault.trust_score} className={styles.trustScore} />
      </div>
    </Link>
  );
};
