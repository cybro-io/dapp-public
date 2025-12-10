import React, { useMemo } from 'react';

import {
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@heroui/react';

import {
  TableColumns,
  truncateMiddle,
  useAppKitAccount,
  useTable,
} from '@/shared/lib';
import {
  useGetReferralsApiV1ProfileAddressRefcodeReferralsGet,
  ReferralData,
  GetReferralsApiV1ProfileAddressRefcodeReferralsGetSortBy,
} from '@/shared/types';
import { Loader, Stack, Title, Typography } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

const columns: TableColumns<ReferralData> = [
  {
    headerName: "Friends's address",
    key: 'address',
    renderCell: (row) => truncateMiddle(row.address),
  },
  {
    headerName: 'Date invited',
    key: 'invited',
    renderCell: (row) => new Date(row.invited).toLocaleDateString(),
    sortable: true,
  },
  {
    headerName: 'Deposited',
    key: 'deposited',
    renderCell: (row) => (
      <Typography
        variant="caption"
        order={2}
        weight="regular"
        className={!Number(row.deposited) ? 'text-white/20' : 'text-white'}
      >
        {!Number(row.deposited) ? '-' : `$${formatUserMoney(row.deposited)}`}
      </Typography>
    ),
    headerProps: {
      className: 'text-right',
    },
    cellProps: {
      className: 'text-right',
    },
    sortable: true,
  },
  {
    headerName: 'Estimated rewards',
    key: 'rewards',
    renderCell: (row) => (
      <Typography
        variant="caption"
        order={2}
        weight="regular"
        className={
          !Number(row.rewards) ? 'text-white/20' : 'text-trustScore-green-100'
        }
      >
        {!Number(row.rewards) ? '-' : `+$${formatUserMoney(row.rewards)}`}
      </Typography>
    ),
    headerProps: {
      className: 'text-right',
    },
    cellProps: {
      className: 'text-right',
    },
    sortable: true,
  },
];

export const ReferralsTable = () => {
  const { address } = useAppKitAccount();

  const {
    renderCell,
    headerColumns,
    getCellProps,
    sortProps,
    setPage,
    page,
    limit,
  } = useTable({
    limit: 10,
    name: 'referrals',
    columns,
  });

  const { data: referrals, isLoading } =
    useGetReferralsApiV1ProfileAddressRefcodeReferralsGet(
      address!,
      {
        sort_by: sortProps.sortDescriptor
          .column as GetReferralsApiV1ProfileAddressRefcodeReferralsGetSortBy,
        ascending: sortProps.sortDescriptor.direction === 'ascending',
      },
      {
        query: {
          enabled: Boolean(address),
          select: (data) => data.data.data,
          queryKey: [
            'referrals',
            sortProps.sortDescriptor.column,
            sortProps.sortDescriptor.direction,
            address,
          ],
          refetchInterval: 10_000,
        },
      },
    );

  const totalPages = Math.ceil((referrals?.length ?? 0) / limit);
  const paginationReferrals = useMemo(() => {
    return referrals?.slice((page - 1) * limit, page * limit) ?? [];
  }, [referrals, page, limit]);

  return (
    <Stack className="gap-6 flex-1 max-w-full">
      <Title order={5}>Invited friends</Title>

      <Table
        isStriped
        aria-label="referrals"
        classNames={{
          wrapper: 'px-0 bg-transparent shadow-none pt-0',
          td: 'group-data-[odd=true]/tr:before:bg-background-tableRow',
          th: 'bg-transparent',
        }}
        {...sortProps}
        bottomContentPlacement="outside"
        bottomContent={
          totalPages ? (
            <Pagination
              isDisabled={isLoading}
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
          ) : null
        }
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
          emptyContent="No referrals"
          items={paginationReferrals}
          loadingContent={
            <div className="py-10 flex items-center">
              <Loader />
            </div>
          }
          isLoading={isLoading}
        >
          {(item) => (
            <TableRow key={item.address}>
              {(columnKey) => (
                <TableCell {...getCellProps(item, columnKey)}>
                  {renderCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Stack>
  );
};
