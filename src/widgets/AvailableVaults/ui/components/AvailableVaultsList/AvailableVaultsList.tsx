'use client';
import React, { Dispatch, SetStateAction } from 'react';

import { Skeleton } from '@nextui-org/react';
import clsx from 'clsx';

import {
  ComponentWithProps,
  SortValue,
  VaultResponseData,
} from '@/shared/types';
import { Dropdown, DropdownView, Loader, Text, TextView } from '@/shared/ui';

import DownIcon from '../../../assets/icons/down.svg';
import UpIcon from '../../../assets/icons/up.svg';

import styles from './AvailableVaultsList.module.scss';
import { VaultListCompactItem } from './VaultListCompactItem';
import { VaultListItem } from './VaultListItem';

type AvailableVaultsGridProps = {
  vaults: VaultResponseData[];
  skeletons: number[];
  sort: [SortValue, boolean];
  setSort: Dispatch<SetStateAction<[SortValue, boolean]>>;
  balance: Record<string, number>;
  isConnected: boolean;
  isLoading: boolean;
};

enum Sort {
  Descending = 'descending',
  Ascending = 'ascending',
  Default = 'default',
}

const headers = [
  {
    label: 'Vault Name',
    key: SortValue.name,
  },
  {
    label: 'Assets',
  },
  {
    label: 'APY',
    key: SortValue.apy,
  },
  {
    label: 'Vault TVL',
    key: SortValue.tvl,
  },
  {
    label: 'Provider',
    key: SortValue.provider,
  },
  {
    label: 'Trust Score',
    key: SortValue.trust_score,
  },
];

export const AvailableVaultsList: ComponentWithProps<
  AvailableVaultsGridProps
> = ({
  vaults,
  sort,
  setSort,
  skeletons,
  balance,
  isConnected,
  isLoading,
  className,
}) => {
  const [currentSort, setCurrentSort] = React.useState<{
    column: SortValue | null;
    direction: Sort;
  }>({
    column: sort[0],
    direction: sort[1] ? Sort.Ascending : Sort.Descending,
  });

  const getSortIcons = React.useCallback((sort: Sort) => {
    switch (sort) {
      case Sort.Default:
        return (
          <React.Fragment>
            <UpIcon />
            <DownIcon />
          </React.Fragment>
        );
      case Sort.Descending:
        return <DownIcon />;
      case Sort.Ascending:
        return <UpIcon />;
    }
  }, []);

  const handleSort = React.useCallback(
    (sortName: SortValue) => {
      setCurrentSort((prevState) => {
        if (prevState.column !== sortName) {
          setSort([sortName, true]);
          return { column: sortName, direction: Sort.Ascending };
        }

        let newDirection;
        if (prevState.direction === Sort.Default) {
          newDirection = Sort.Ascending;
        } else if (prevState.direction === Sort.Ascending) {
          newDirection = Sort.Descending;
        } else {
          newDirection = Sort.Ascending;
        }

        setSort([sortName, newDirection === Sort.Ascending]);
        return { column: sortName, direction: newDirection };
      });
    },
    [setSort],
  );

  const handleDropdownSort = React.useCallback(
    (sortName: SortValue, event: any) => {
      event.stopPropagation();
      event.preventDefault();

      setSort([sortName, true]);
      setCurrentSort({ column: sortName, direction: Sort.Ascending });
    },
    [setSort],
  );

  React.useEffect(() => {
    // Update local state when sort prop changes
    setCurrentSort({
      column: sort[0],
      direction: sort[1] ? Sort.Ascending : Sort.Descending,
    });
  }, [sort]);

  const dropdownSortItems = headers.filter((item) => !!item.key);

  return (
    <div className={clsx(styles.root, className)}>
      {isLoading &&
        skeletons.map((_, index) => (
          <Skeleton
            disableAnimation={index % 2 !== 0}
            classNames={{
              base: 'rounded-lg w-full h-[84px] odd:dark:bg-background-tableRow dark:bg-transparent',
            }}
          />
        ))}
      {!isLoading && (
        <div className={styles.table}>
          <div className={styles.mobileSort}>
            <Text textView={TextView.P3} className={styles.sortBy}>
              Sort by
            </Text>
            <Dropdown
              items={dropdownSortItems}
              viewType={DropdownView.Flat}
              selectedTitle={
                headers.find(({ key, label }) => sort[0] === key)?.label
              }
              selectedKey={sort[0]}
              setSelected={handleDropdownSort}
            />
          </div>
          <div className={styles.tableHeader}>
            {headers.map((header) => {
              if (!header.key) {
                return (
                  <div key={header.label} className={styles.tableCell}>
                    {header.label}
                  </div>
                );
              }

              return (
                <button
                  key={header.label}
                  className={styles.tableCell}
                  onClick={() => handleSort(header.key)}
                >
                  {header.label}
                  <div className={styles.sortButtonsContainer}>
                    {getSortIcons(
                      currentSort.column === header.key
                        ? currentSort.direction
                        : Sort.Default,
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          {vaults.map((vault, index) => (
            <React.Fragment>
              <VaultListItem
                className={styles.tableVault}
                index={index}
                vault={vault}
              />
              <VaultListCompactItem
                className={styles.compactVault}
                index={index}
                vault={vault}
              />
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};
