'use client';

import React from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import clsx from 'clsx';
import { useRouter } from 'next/navigation';
import numeral from 'numeral';

import { Tvl } from '@/entities/Tvl';
import { QueryKey } from '@/shared/const';
import { links, useWeb3ModalAccount } from '@/shared/lib';
import {
  TableColumns,
  TableColumnType,
  useTable,
} from '@/shared/lib/hooks/useTable';
import {
  ComponentWithProps,
  useGetFundsApiV1VaultsGet,
  VaultResponseData,
} from '@/shared/types';
import {
  AlertTooltip,
  AssetIcon,
  EnumFilter,
  Loader,
  SearchInputV2,
  Text,
  TextView,
  TrustScore,
  TrustScoreViewType,
} from '@/shared/ui';
import { VaultListCompactItem } from '@/widgets/AvailableVaults/ui/components/AvailableVaultsList/VaultListCompactItem';
import { ErrorMessage } from '@/widgets/ErrorMessage';

import styles from './AvailableVaults.module.scss';

type AvailableVaultsProps = {};

const AvailableVaultsV2: ComponentWithProps<AvailableVaultsProps> = ({
  className,
}) => {
  const router = useRouter();

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
  } = useTable<VaultResponseData>({
    columns: tableColumns,
    defaultSort: {
      column: 'apy',
      direction: 'descending',
    },
  });

  const { address } = useWeb3ModalAccount();

  const {
    data,
    isLoading: isLoadingVaults,
    isError,
  } = useGetFundsApiV1VaultsGet(
    {
      address,
      //sort_by: sort[0], ascending: sort[1]
    },
    {
      query: {
        queryKey: [QueryKey.AvailableVaults, address],
      },
    },
  );

  const filterItems = React.useCallback(
    (items: VaultResponseData[]) => {
      let arrayItem = items;

      if (searches.name) {
        arrayItem = arrayItem.filter((vault) =>
          vault.name.toLowerCase().includes(searches.name.toLowerCase()),
        );
      }

      arrayItem = filterByValue('parameter.intention', arrayItem);
      arrayItem = filterByValue('parameter.management_type', arrayItem);
      arrayItem = filterByValue('parameter.manager', arrayItem);
      arrayItem = filterByValue('provider.name', arrayItem);

      return arrayItem;
    },
    [filters, searches.name],
  );

  const isLoading = isLoadingVaults;
  const vaults = sortItems(filterItems(data?.data.data ?? []));

  const topContent = React.useMemo(() => {
    return (
      <div className="flex justify-between gap-3 items-end flex-wrap">
        <SearchInputV2
          {...getSearchProps('name')}
          placeholder="Search by vault name..."
        />

        <div className="flex gap-3 flex-wrap">
          {Object.entries(filters).map(([key, value]) => (
            <EnumFilter
              key={key}
              onSelectionChange={(value) => setFilter(key, value)}
              selectedKeys={value}
              name={columns.find((column) => column.key === key)!.headerName}
              dictionary={
                columns.find((column) => column.key === key)!.cellProps
                  ?.dictionary ?? {}
              }
            />
          ))}

          <EnumFilter
            className="hidden lg:flex"
            onSelectionChange={setVisibleColumns}
            selectedKeys={visibleColumns}
            name="Columns"
            dictionary={dictionaryColumns}
          />
        </div>
      </div>
    );
  }, [
    columns,
    dictionaryColumns,
    filters,
    setVisibleColumns,
    visibleColumns,
    getSearchProps,
  ]);

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
        <Tvl />
      </div>

      <div className="flex flex-col gap-4">
        {topContent}

        <div className="flex lg:hidden flex-col gap-4">
          {vaults.map((value, index) => (
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
              <TableColumn key={column.key} allowsSorting={column.sortable}>
                {column.headerName}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent="No vaults found"
            items={vaults}
            loadingContent={
              <div className="py-10 flex items-center">
                <Loader />
              </div>
            }
            isLoading={isLoading}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
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

const Providers = [
  'Juice Finance',
  'ZeroLend',
  'Blastup',
  'Orbit Protocol',
  'Pac Finance',
  'Aso Finance',
  'Cybro',
  'Init Capital',
];

const tableColumns: TableColumns<VaultResponseData> = [
  {
    headerName: 'Fund name',
    key: 'name',
    sortable: true,
    renderCell: (row) => (
      <div className="inline-flex gap-1 items-center">
        {row.name} <AlertTooltip content={row.alert_text} />
      </div>
    ),
  },
  {
    headerName: 'Intention',
    key: 'parameter.intention',
    sortable: true,
    type: TableColumnType.enum,
    cellProps: {
      dictionary: {
        'fiat-stable': 'Fiat-Stable',
        'growth-crypto': 'Growth-Crypto',
      },
    },
    mountInvisible: true,
    filterable: true,
  },
  {
    headerName: 'APY',
    key: 'apy',
    sortable: true,
    renderCell: (row) => `${row.apy}%`,
  },
  {
    headerName: 'Trust score',
    key: 'trust_score',
    sortable: true,
    renderCell: (row) => (
      <TrustScore viewType={TrustScoreViewType.Small} value={row.trust_score} />
    ),
  },
  {
    headerName: 'Rebalancing',
    key: 'parameter.management_type',
    sortable: true,
    type: TableColumnType.enum,
    cellProps: {
      dictionary: {
        active: 'Active',
        inactive: 'Inactive',
      },
    },
    filterable: true,
  },
  {
    headerName: 'Tokens',
    key: 'token',
    renderCell: (row) => (
      <div className="flex flex-row gap-1">
        {getTokensFromVault(row).map((token) => (
          <AssetIcon
            key={token.name}
            src={token.icon ?? links.noImage}
            alt={token.name}
            width={24}
            height={24}
          />
        ))}
      </div>
    ),
  },
  {
    headerName: 'Chain',
    key: 'chain',
    sortable: true,
    type: TableColumnType.enum,
    cellProps: { dictionary: { Blast: 'Blast' } },
  },
  {
    headerName: 'Management',
    key: 'parameter.manager',
    sortable: true,
    type: TableColumnType.enum,
    cellProps: {
      dictionary: {
        cybro: 'Cybro',
        external: 'External',
      },
    },
    filterable: true,
  },
  {
    headerName: 'TVL',
    key: 'tvl',
    sortable: true,
    renderCell: (row) => numeral(row.tvl).format('0.00a'),
  },
  {
    headerName: 'Provider',
    key: 'provider.name',
    sortable: true,
    type: TableColumnType.enum,
    filterable: true,
    cellProps: {
      dictionary: Providers.reduce(
        (acc, item) => ({ ...acc, [item]: item }),
        {},
      ),
    },
  },
] as const;

const getTokensFromVault = (vault: VaultResponseData) =>
  vault.tokens?.length ? vault.tokens : [vault.token];
