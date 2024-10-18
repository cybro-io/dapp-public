import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';
import numeral from 'numeral';

import { VaultChips } from '@/entities/VaultChips';
import { ComponentWithProps, VaultResponseData } from '@/shared/types';
import { Text, TextView, TrustScore, TrustScoreViewType } from '@/shared/ui';

import styles from './VaultListItem.module.scss';

type VaultItemProps = {
  vault: VaultResponseData;
  index: number;
};

export const VaultListItem: ComponentWithProps<VaultItemProps> = ({
  vault,
  index,
  className,
}) => {
  const tokens = vault.tokens?.length ? vault.tokens : [vault.token];

  return (
    <Link
      className={clsx(
        styles.tableRow,
        index % 2 === 0 && styles.dark,
        className,
      )}
      href={`/vaults/${vault.id}`}
      key={vault.id}
    >
      <div className={clsx(styles.tableCell, styles.vaultNameCell)}>
        <Text className={styles.vaultName} textView={TextView.H5}>
          {vault.name}
        </Text>
        <VaultChips className={styles.chips} badges={vault.badges} />
      </div>
      <div className={clsx(styles.tableCell, styles.cellTokens)}>
        {tokens.map((token) => (
          <div className={styles.assetsCell}>
            <div className={styles.assetTokenContainer}>
              <Image
                src={token.icon ?? vault.icon}
                width={30}
                height={30}
                alt={''}
              />
            </div>
            {token.name}
          </div>
        ))}
      </div>
      <div className={clsx(styles.tableCell, styles.apyCell)}>{vault.apy}%</div>
      <div className={clsx(styles.tableCell, styles.tvlCell)}>
        {numeral(Math.floor(Number(vault.tvl))).format('0.0a')}
      </div>
      <div className={clsx(styles.tableCell, styles.providerCell)}>
        {vault.provider.name}
      </div>
      <div className={clsx(styles.tableCell, styles.trustScoreCell)}>
        <TrustScore
          value={vault.trust_score}
          viewType={TrustScoreViewType.Small}
        />
      </div>
    </Link>
  );
};
