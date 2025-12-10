'use client';

import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import clsx from 'clsx';
import { useRouter, useSearchParams } from 'next/navigation';

import { Tvl } from '@/entities/Tvl';
import { useTable } from '@/shared/lib/hooks/useTable';
import { PropsWithClassName, VaultResponseData } from '@/shared/types';
import {
  ClearFilterButton,
  EnumFilter,
  Loader,
  SearchInputV2,
  Text,
  TextView,
  vaultBadges,
} from '@/shared/ui';
import { ErrorMessage } from '@/widgets/ErrorMessage';

import { useAvailableVaults } from '../model/useAvailableVaults';

import styles from './AvailableVaults.module.scss';
import { VaultListCompactItem } from './VaultListCompactItem';

const AvailableVaultsV2 = ({ className }: PropsWithClassName) => {
  const router = useRouter();

  const { isLoadingVaults, vaults, isError, tableColumns } =
    useAvailableVaults();

  const {
    columns,
    renderCell,
    dictionaryColumns,
    headerColumns,
    setVisibleColumns,
    visibleColumns,
    sortItems,
    sortProps,
    getSearchProps,
    filters,
    setFilter,
    filterByValue,
    searches,
    getCellProps,
    clearFilters,
    isHasFilter,
  } = useTable<VaultResponseData>({
    name: 'all_vaults',
    columns: tableColumns,
    defaultSort: {
      column: 'rating',
      direction: 'ascending',
    },
  });

  const searchParams = useSearchParams();

  React.useEffect(() => {
    const chain = searchParams.get('chain');
    if (chain) {
      setFilter('chain_name', new Set([chain]));
    }
  }, [searchParams]);

  const filterItems = React.useCallback(
    (items: VaultResponseData[]) => {
      let arrayItem = items;

      if (searches.name) {
        arrayItem = arrayItem.filter((vault) =>
          vault.name.toLowerCase().includes(searches.name.toLowerCase()),
        );
      }

      const badgesFilterValue =
        filters.name === 'all' ? Object.keys(vaultBadges) : [...filters.name];

      if (badgesFilterValue.length > 0) {
        arrayItem = arrayItem.filter((vault) =>
          vault.badges?.some((badge) => badgesFilterValue.includes(badge)),
        );
      }

      arrayItem = filterByValue('parameter.intention', arrayItem);
      arrayItem = filterByValue('parameter.management_type', arrayItem);
      arrayItem = filterByValue('parameter.manager', arrayItem);
      arrayItem = filterByValue('provider_name', arrayItem);
      arrayItem = filterByValue('chain_name', arrayItem);

      return arrayItem;
    },
    [filters, searches.name],
  );

  const filteredAndSortedVaults = sortItems(filterItems(vaults));

  const topContent = React.useMemo(() => {
    return (
      <div className="flex justify-between gap-3 items-end flex-wrap">
        <SearchInputV2
          classNames={{
            base: 'flex-1 lg:flex-[0.5] min-w-[267px] max-w-[267px]',
          }}
          {...getSearchProps('name')}
          placeholder="Search by vault name..."
        />

        <div className="flex gap-3 flex-wrap">
          {Object.entries(filters).map(([key, value]) => {
            const findColumn = columns.find((column) => column.key === key);

            return (
              <EnumFilter
                key={key}
                onSelectionChange={(value) => setFilter(key, value)}
                selectedKeys={value}
                name={findColumn?.filterName ?? findColumn?.headerName ?? ''}
                dictionary={findColumn?.cellProps?.dictionary ?? {}}
              />
            );
          })}

          <EnumFilter
            className="hidden lg:flex"
            onSelectionChange={setVisibleColumns}
            selectedKeys={visibleColumns}
            name="Columns"
            dictionary={dictionaryColumns}
          />
        </div>

        {isHasFilter && <ClearFilterButton onPress={clearFilters} />}
      </div>
    );
  }, [
    getSearchProps,
    filters,
    setVisibleColumns,
    visibleColumns,
    dictionaryColumns,
    isHasFilter,
    clearFilters,
    columns,
    setFilter,
  ]);

  if (isError) {
    return <ErrorMessage />;
  }

  return (
    <section className={clsx(styles.root, className)}>
      <div className={styles.top}>
        <Text className={styles.heading} textView={TextView.H3}>
          Available Vaults
          <span className={styles.counter}>
            {filteredAndSortedVaults.length}
          </span>
        </Text>
        {/*<Tvl />*/}
      </div>

      <div className="flex flex-col gap-4">
        {topContent}

        <div className="flex lg:hidden flex-col gap-4">
          {filteredAndSortedVaults.map((value, index) => (
            <VaultListCompactItem vault={value} key={value.id} index={index} />
          ))}
        </div>

        <Table
          removeWrapper
          aria-label="available vaults"
          bottomContentPlacement="outside"
          classNames={{
            table: 'hidden lg:table',
            wrapper: ['rounded-lg', 'bg-background-chips/50'],
            th: 'bg-background-chips',
            tr: 'cursor-pointer',
            td: 'odd:text-white/90 text-white/70 first:font-unbounded font-poppins text-base py-4 font-regular group-aria-[selected=false]:group-data-[hover=true]:before:bg-background-chips',
          }}
          selectionMode="single"
          onRowAction={(key) => router.push(`/explore/${key}`)}
          {...sortProps}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn
                key={column.key}
                allowsSorting={column.sortable}
                {...column.headerProps}
              >
                {column.headerName}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent="No vaults found"
            items={filteredAndSortedVaults}
            loadingContent={
              <div className="py-10 flex items-center">
                <Loader />
              </div>
            }
            isLoading={isLoadingVaults}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell {...getCellProps(item, columnKey)}>
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};

export default AvailableVaultsV2;
