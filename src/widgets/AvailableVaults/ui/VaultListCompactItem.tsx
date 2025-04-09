import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { VaultChips } from '@/entities/VaultChips';
import { VaultStats, VaultStatsView } from '@/entities/VaultStats';
import { ComponentWithProps, VaultResponseData } from '@/shared/types';
import {
  AlertTooltip,
  Text,
  TextView,
  TrustScore,
  TrustScoreViewType,
} from '@/shared/ui';

import styles from './VaultListCompactItem.module.scss';

type VaultListCompactItemProps = {
  vault: VaultResponseData;
  index: number;
};

export const VaultListCompactItem: ComponentWithProps<
  VaultListCompactItemProps
> = ({ vault, index, className }) => {
  const tokens = vault.tokens?.length ? vault.tokens : [vault.token];

  return (
    <Link
      className={clsx(styles.root, index % 2 === 0 && styles.dark, className)}
      href={`/explore/${vault.id}`}
      key={vault.id}
    >
      <div className={styles.top}>
        <div className="flex flex-row gap-2">
          <Text textView={TextView.P3}>{vault.name}</Text>
          <AlertTooltip content={vault.alert_text} />
        </div>
        <TrustScore
          className={styles.trustScore}
          value={vault.trust_score}
          viewType={TrustScoreViewType.Small}
        />
        <div className={styles.tokenIcon}>
          {tokens.map((token) => (
            <Image
              key={token.name}
              src={token.icon ?? vault.icon}
              width={24}
              height={24}
              alt={''}
            />
          ))}
        </div>
      </div>
      <VaultStats
        className={styles.vaultStats}
        apy={vault.apy}
        cybroPoints={'20'}
        tvl={vault.tvl}
        chain={vault.chain}
        viewType={VaultStatsView.Card}
        overallVaultInvestment={vault.overall_investments_usd}
      />
      <VaultChips className={styles.chipsContainer} badges={vault.badges} />
    </Link>
  );
};
