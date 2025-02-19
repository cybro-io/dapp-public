import React from 'react';

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from '@nextui-org/react';
import { useRouter } from 'next/navigation';

import { Badge, Group, Loader, Title } from '@/shared/ui';
import typographyStyles from '@/shared/ui/baseComponents/Typography/Typography.module.scss';
import { PeriodTabs } from '@/views/DashboardPage/ui/PeriodTabs';

import { useMyVaults } from '../model/useMyVaults';

interface MyVaultsProps {
  walletAddress: string;
}

export const MyVaults = ({ walletAddress }: MyVaultsProps) => {
  const router = useRouter();
  const {
    period,
    setPeriod,
    vaults,
    isFetching,
    totalPages,
    tableProps,
    total,
  } = useMyVaults({
    walletAddress,
  });

  const { renderCell, headerColumns, sortProps, setPage, page } = tableProps;

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
        td: 'font-poppins text-base py-4 font-regular group-data-[odd=true]:before:bg-background-tableRow',
      }}
      topContent={
        <Group className="justify-center sm:justify-between gap-y-3">
          <Group className="gap-2.5">
            <Title order={3} uppercase>
              My investments
            </Title>

            <Badge className="hidden md:block">{total}</Badge>
          </Group>

          <PeriodTabs period={period} onPeriodChange={setPeriod} />
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
        isLoading={isFetching}
        loadingState={isFetching ? 'loading' : 'idle'}
        emptyContent="No vaults found"
        items={vaults}
      >
        {(item) => (
          <TableRow
            key={item.fund.name}
            onClick={() => router.push(`/explore/${item.fund.id}`)}
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
