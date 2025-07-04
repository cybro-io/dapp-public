import React from 'react';

import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/react';
import { CopyIcon, LinkIcon } from '@heroui/shared-icons';
import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';

import { getExplorerProvider } from '@/shared/lib';
import {
  links,
  TableColumns,
  TableColumnType,
  truncateMiddle,
} from '@/shared/lib';
import { DashboardHistoryData } from '@/shared/types';
import { Group, Typography } from '@/shared/ui';
import typographyStyles from '@/shared/ui/baseComponents/Typography/Typography.module.scss';
import { formatUserMoney } from '@/shared/utils';

export const createTableColumns = (oneVault = false) => {
  const columns: TableColumns<DashboardHistoryData> = [
    {
      headerName: 'Date',
      key: 'transaction_ts',
      sortable: true,
      renderCell: (row) => (
        <Typography
          component="span"
          variant="poppins"
          order={2}
          weight="regular"
        >
          {dayjs(row.transaction_ts).format('DD/MM/YYYY HH:mm')}
        </Typography>
      ),
    },
    {
      headerName: 'Vault name',
      key: 'fund_name',
      sortable: true,
      searchable: !oneVault,
      cellProps: {
        className: clsx(typographyStyles.textPoppins2),
      },
      mountInvisible: oneVault,
    },
    {
      headerName: 'Operation',
      key: 'action',
      filterable: true,
      sortable: true,
      type: TableColumnType.enum,
      cellProps: {
        dictionary: { deposit: 'Deposit', withdraw: 'Withdraw' },
        className: clsx(typographyStyles.textPoppins2, 'text-white/80'),
      },
    },
    {
      headerName: 'Share count',
      key: 'share_count',
      sortable: true,
      headerProps: {
        className: 'text-right',
      },
      cellProps: {
        className: clsx(
          typographyStyles.textPoppins2,
          'text-white/80 text-right',
        ),
      },
      renderCell: (row) => formatUserMoney(row.share_count, 6, 6),
    },
    {
      headerName: 'TxID',
      key: 'transaction_hash',
      sortable: false,

      renderCell: (row) => <RenderTxId {...row} />,
      searchable: true,
    },
    {
      headerName: 'Token',
      key: 'token_in_name',
      sortable: false,
      renderCell: (row) => (
        <Group className="gap-1.5">
          <Image
            width={24}
            height={24}
            src={row?.icon ?? links.noImage}
            alt={row?.token_in_name ?? ''}
          />
          <Typography
            variant="poppins"
            order={2}
            weight="regular"
            className="text-white/40"
          >
            {row.token_in_name}
          </Typography>
        </Group>
      ),
    },
    {
      headerName: 'Amount',
      key: 'token_amount',
      sortable: true,
      headerProps: {
        className: 'text-right',
      },
      renderCell: (row) => (
        <Typography
          order={2}
          variant="poppins"
          weight="regular"
          className={clsx(
            'text-right',
            row.action === 'withdraw'
              ? 'text-trustScore-red-100'
              : 'text-trustScore-green-100',
          )}
        >
          {(row.action === 'withdraw' ? '-' : '+') +
            formatUserMoney(row.token_amount, 6, 6)}
        </Typography>
      ),
    },
  ] as const;

  return columns;
};

const RenderTxId = (row: DashboardHistoryData) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <span
      className={clsx(
        typographyStyles.textPoppins2,
        'text-white/80 inline-flex gap-1 items-center w-full',
      )}
    >
      {truncateMiddle(row.transaction_hash)}
      <Tooltip
        content="Copied!"
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      >
        <Button
          isIconOnly
          className="!size-6 !min-w-6"
          radius="sm"
          variant="light"
          onClick={() => {
            navigator.clipboard.writeText(row.transaction_hash).then(() => {
              setIsOpen(true);
            });
          }}
        >
          <CopyIcon className="size-3" />
        </Button>
      </Tooltip>
      <a
        target="_blank"
        href={
          getExplorerProvider(row?.chain_id ?? 0) +
          '/tx/' +
          row.transaction_hash
        }
        rel="noreferrer"
      >
        <Button
          isIconOnly
          className="!size-6 !min-w-6"
          radius="sm"
          variant="light"
        >
          <LinkIcon className="size-3" />
        </Button>
      </a>
    </span>
  );
};
