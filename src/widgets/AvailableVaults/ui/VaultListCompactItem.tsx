import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import Markdown from 'react-markdown';

import { VaultBadgeList } from '@/entities/Vault';
import { VaultStats, VaultStatsView } from '@/entities/VaultStats';
import { ComponentWithProps, VaultResponseData } from '@/shared/types';
import {
  AlertTooltip,
  Group,
  Text,
  TextView,
  TrustScore,
  TrustScoreViewType,
  VaultBadge,
  VaultBadgeProps,
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
          <AlertTooltip
            isVisible={Boolean(vault.alert_text)}
            content={<Markdown>{vault.alert_text}</Markdown>}
          />
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

      <VaultBadgeList
        badges={vault.badges}
        className="gap-1.5 justify-center mt-1 mb-3"
      />

      <VaultStats
        className={styles.vaultStats}
        apy={vault.apy}
        cybroPoints={'20'}
        tvl={vault.tvl_brutto}
        chain={vault.chain_name}
        viewType={VaultStatsView.Card}
        overallVaultInvestment={vault.tvl_netto}
      />
    </Link>
  );
};
