'use client';

import React from 'react';

import clsx from 'clsx';
import Image from 'next/image';
import Link from 'next/link';

import { ComponentWithProps, DashboardStatsVaultsData } from '@/shared/types';
import {
  InfoBox,
  InfoBoxActionType,
  InfoBoxViewType,
  Text,
  TextView,
} from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import TokenIcon from '../assets/icons/Avalance.svg';
import VaultsIcon from '../assets/icons/vaults.svg';

import styles from './MyVaultsInfo.module.scss';

type ApyInfoProps = {
  vaults: DashboardStatsVaultsData[] | undefined;
  viewType?: InfoBoxViewType;
  isLoading?: boolean;
};

export const MyVaultsInfo: ComponentWithProps<ApyInfoProps> = ({
  vaults,
  viewType = InfoBoxViewType.Mobile,
  isLoading,
  className,
}) => {
  const [isOpened, setIsOpened] = React.useState(false);

  const vaultsList = React.useMemo(() => {
    return vaults?.map((vault) => {
      const tokens = vault.tokens?.length
        ? vault.tokens.map((token) => ({
            icon: token.icon ?? '',
            name: token.name,
          }))
        : [{ icon: vault.icon, name: vault.name }];

      return (
        <Link href={`/vaults/${vault.id}`} key={vault.id}>
          <div className={styles.dropdownItem}>
            <div className="flex flex-row gap-1">
              {tokens.map((token, index) => (
                <Image
                  key={token.name}
                  src={token.icon}
                  width={20}
                  height={20}
                  alt={token.name}
                />
              ))}
            </div>

            <div className={styles.contentContainer}>
              <Text textView={TextView.P3} className={styles.title}>
                {vault.name}
              </Text>
              <Text textView={TextView.C4} className={styles.value}>
                ${formatUserMoney(vault.balance_usd)}
              </Text>
            </div>
          </div>
        </Link>
      );
    });
  }, [vaults]);

  return (
    <InfoBox
      icon={<VaultsIcon />}
      title={'My vaults'}
      value={vaultsList?.length.toString() || '0'}
      isOpened={isOpened}
      setIsOpened={() => setIsOpened((prev) => !prev)}
      viewType={viewType}
      actionType={InfoBoxActionType.Dropdown}
      className={className}
      dropdownItems={vaultsList}
      isLoading={isLoading}
    />
  );
};
