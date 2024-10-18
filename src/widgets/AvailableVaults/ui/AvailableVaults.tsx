'use client';

import React from 'react';

import { Tab, Tabs } from '@nextui-org/tabs';
import clsx from 'clsx';

import { Tvl } from '@/entities/Tvl';
import { QueryKey } from '@/shared/const';
import { useWeb3ModalAccount } from '@/shared/lib';
import {
  ComponentWithProps,
  SortValue,
  useGetBalanceByAddressApiV1ProfileAddressBalanceGet,
} from '@/shared/types';
import { useGetFundsApiV1VaultsGet } from '@/shared/types';
import { Text, TextView } from '@/shared/ui';
import { transformBalances } from '@/shared/utils';
import {
  AvailableVaultsViewType,
  useAvailableVaultsView,
} from '@/widgets/AvailableVaults';
import { AvailableVaultsGrid } from '@/widgets/AvailableVaults/ui/components';
import { AvailableVaultsList } from '@/widgets/AvailableVaults/ui/components/AvailableVaultsList';
import { ErrorMessage } from '@/widgets/ErrorMessage';

import GridIcon from '../assets/icons/grid.svg';
import ListIcon from '../assets/icons/list.svg';

import styles from './AvailableVaults.module.scss';

type AvailableVaultsProps = {};

const skeletons = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

const AvailableVaults: ComponentWithProps<AvailableVaultsProps> = ({
  className,
}) => {
  const { viewType, setViewType } = useAvailableVaultsView();

  const [sort, setSort] = React.useState<[SortValue, boolean]>(() => {
    // Check session storage for the initial sort value
    if (typeof window !== 'undefined') {
      const sortValue = sessionStorage.getItem('sortValue');
      const sortOrder = sessionStorage.getItem('sortOrder') === 'true'; // Convert to boolean
      return sortValue
        ? [sortValue as SortValue, sortOrder]
        : [SortValue.apy, false];
    }
    return [SortValue.apy, false];
  });

  const { address, chainId, isConnected } = useWeb3ModalAccount();
  const { data, isLoading, isError } = useGetFundsApiV1VaultsGet(
    { address, sort_by: sort[0], ascending: sort[1] },
    {
      query: {
        queryKey: [QueryKey.AvailableVaults, address, sort[0], sort[1]],
      },
    },
  );

  const { data: balanceData } =
    useGetBalanceByAddressApiV1ProfileAddressBalanceGet(
      address || '',
      { chain_id: chainId || 0 },
      {
        query: { queryKey: [QueryKey.UserBalance, address, chainId] },
      },
    );

  // Store sort in session storage whenever it changes
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      sessionStorage.setItem('sortValue', sort[0]);
      sessionStorage.setItem('sortOrder', String(sort[1])); // Convert boolean to string
    }
  }, [sort]);

  const vaults = data?.data?.data || [];
  const balance = React.useMemo(
    () => transformBalances(balanceData?.data?.data || []),
    [balanceData?.data?.data],
  );

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <section className={clsx(styles.root, className)}>
      <div className={styles.top}>
        <Text className={styles.heading} textView={TextView.H3}>
          Available Vaults
          <span className={styles.counter}>{vaults.length}</span>
        </Text>
        <Tvl className={clsx(styles.chip, 'visible 2lg:invisible')} />
        <Tabs
          className={styles.listViewSwitch}
          selectedKey={viewType}
          size="sm"
          defaultSelectedKey={AvailableVaultsViewType.Card}
          onSelectionChange={(key) => {
            setViewType(key as AvailableVaultsViewType);
          }}
          classNames={{
            tabList: styles.tabList,
            tab: styles.tab,
          }}
        >
          <Tab
            key={AvailableVaultsViewType.Table}
            title={
              <p className={styles.tabContent}>
                {viewType === AvailableVaultsViewType.Table && 'Table view'}
                <ListIcon />
              </p>
            }
          />
          <Tab
            key={AvailableVaultsViewType.Card}
            title={
              <p className={styles.tabContent}>
                {viewType === AvailableVaultsViewType.Card && 'Card view'}
                <GridIcon />
              </p>
            }
          />
        </Tabs>
      </div>

      {viewType === AvailableVaultsViewType.Card ? (
        <AvailableVaultsGrid
          balance={balance}
          isConnected={isConnected}
          isLoading={isLoading}
          skeletons={skeletons}
          vaults={vaults}
        />
      ) : (
        <AvailableVaultsList
          balance={balance}
          sort={sort}
          setSort={setSort}
          isConnected={isConnected}
          isLoading={isLoading}
          skeletons={skeletons}
          vaults={vaults}
        />
      )}
    </section>
  );
};

export default AvailableVaults;
