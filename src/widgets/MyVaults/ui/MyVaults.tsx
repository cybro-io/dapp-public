import React from 'react';

import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';
import { useFlag } from '@unleash/proxy-client-react';
import { useRouter } from 'next/navigation';

import { Flag } from '@/shared/lib';
import { Badge, Dropdown, EnumFilter, Group, Loader, Title } from '@/shared/ui';
import typographyStyles from '@/shared/ui/baseComponents/Typography/Typography.module.scss';

import { myVaultsPeriods } from '../lib/constants';
import { useMyVaults } from '../model/useMyVaults';

interface MyVaultsProps {
  walletAddress: string;
}

export const MyVaults = ({ walletAddress }: MyVaultsProps) => {
  const isEnabledFlag = useFlag(Flag.myInvestmentsTable);

  const router = useRouter();
  const {
    period,
    setPeriod,
    vaults,
    isFetching,
    isLoading,
    totalPages,
    tableProps,
    total,
  } = useMyVaults({
    walletAddress,
  });

  const {
    renderCell,
    headerColumns,
    sortProps,
    setPage,
    page,
    visibleColumns,
    setVisibleColumns,
    dictionaryColumns,
  } = tableProps;

  if (!isEnabledFlag) {
    return null;
  }

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
        wrapper: 'bg-transparent p-0 shadow-none',
        th: ['bg-transparent', typographyStyles.textPoppins4],
        tr: 'cursor-pointer',
        td: 'font-poppins text-base py-4 font-regular group-data-[odd=true]/tr:before:bg-background-tableRow',
      }}
      topContent={
        <Group className="justify-center sm:justify-between gap-y-3">
          <Group className="gap-2.5">
            <Title order={3} uppercase>
              My investments
            </Title>

            <Badge className="hidden md:block">{total}</Badge>
          </Group>

          <Group className="gap-1">
            <EnumFilter
              onSelectionChange={setVisibleColumns}
              selectedKeys={visibleColumns}
              name="Columns"
              dictionary={dictionaryColumns}
            />
            <Dropdown
              buttonProps={{ className: 'w-[100px]' }}
              items={myVaultsPeriods}
              selectedKey={period}
              setSelected={setPeriod}
            />
          </Group>
        </Group>
      }
      aria-label="MyVaults table"
      bottomContentPlacement="outside"
      topContentPlacement="outside"
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
        loadingContent={
          <div className="min-h-[300px] flex justify-center items-center">
            <Loader />
          </div>
        }
        isLoading={isLoading}
        loadingState={isLoading ? 'loading' : 'idle'}
        emptyContent="No vaults found"
        items={vaults}
      >
        {(item) => (
          <TableRow
            key={item.fund_name}
            onClick={() => router.push(`/explore/${item.fund_id}`)}
          >
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
