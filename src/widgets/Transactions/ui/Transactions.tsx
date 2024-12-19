import React from 'react';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Skeleton,
} from '@nextui-org/react';

import {
  Badge,
  EnumFilter,
  Group,
  Loader,
  SearchInputV2,
  Stack,
  Title,
} from '@/shared/ui';
import typographyStyles from '@/shared/ui/baseComponents/Typography/Typography.module.scss';

import { useTransactions } from '../model/useTransactions';

interface TransactionsProps {
  walletAddress: string;
}

export const Transactions = ({ walletAddress }: TransactionsProps) => {
  const { transactions, isLoading, isFetching, totalPages, tableProps, total } =
    useTransactions({
      walletAddress,
    });

  const {
    renderCell,
    headerColumns,
    sortProps,
    setPage,
    page,
    getSearchProps,
    setVisibleColumns,
    visibleColumns,
    columns,
    dictionaryColumns,
    setFilter,
    filters,
  } = tableProps;

  return (
    <Table
      isStriped
      bottomContent={
        <div className="py-2 px-2 flex justify-center items-center">
          {totalPages > 1 && (
            <Pagination
              isDisabled={isFetching}
              showControls
              classNames={{
                cursor: 'bg-foreground text-background',
              }}
              color="default"
              page={page}
              total={totalPages}
              variant="light"
              onChange={setPage}
            />
          )}
        </div>
      }
      classNames={{
        tbody: 'data-[loading=true]:blur-sm',
        wrapper: 'bg-transparent p-0 shadow-none',
        th: ['bg-transparent', typographyStyles.textPoppins4],
        tr: 'cursor-pointer',
        td: 'font-poppins text-base py-4 font-regular group-data-[odd=true]:before:bg-background-tableRow',
      }}
      topContent={
        <Stack className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <Skeleton isLoaded={!isLoading} className="rounded-lg">
              <Group className="gap-2.5">
                <Title order={3} uppercase>
                  My transactions
                </Title>

                <Badge className="hidden md:block">{total}</Badge>
              </Group>
            </Skeleton>
          </div>
          <div className="flex justify-between gap-3 items-end flex-wrap">
            <div className="flex gap-3 flex-wrap">
              <SearchInputV2
                {...getSearchProps('fund_name')}
                placeholder="Search by vault name..."
              />
              <SearchInputV2
                {...getSearchProps('transaction_hash')}
                placeholder="Search by TxID..."
              />
            </div>

            <div className="flex gap-3">
              {Object.entries(filters).map(([key, value]) => (
                <EnumFilter
                  key={key}
                  onSelectionChange={(value) => setFilter(key, value)}
                  selectedKeys={value}
                  name={
                    columns.find((column) => column.key === key)!.headerName
                  }
                  dictionary={
                    columns.find((column) => column.key === key)!.cellProps
                      ?.dictionary ?? {}
                  }
                />
              ))}

              <EnumFilter
                onSelectionChange={setVisibleColumns}
                selectedKeys={visibleColumns}
                name="Columns"
                dictionary={dictionaryColumns}
              />
            </div>
          </div>
        </Stack>
      }
      aria-label="Transaction table"
      bottomContentPlacement="outside"
      topContentPlacement="outside"
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
        loadingContent={
          <div className="min-h-[300px] flex justify-center items-center">
            <Loader />
          </div>
        }
        isLoading={isFetching}
        loadingState={isFetching ? 'loading' : 'idle'}
        emptyContent="No transactions found"
        items={transactions}
      >
        {(item) => (
          <TableRow key={item.transaction_hash}>
            {(columnKey) => (
              <TableCell {...tableProps.getCellProps(item, columnKey)}>
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
