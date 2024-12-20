import clsx from 'clsx';
import dayjs from 'dayjs';
import Image from 'next/image';

import { getExplorerProvider } from '@/entities/LiFi';
import { TableColumns, TableColumnType, truncateMiddle } from '@/shared/lib';
import { DashboardHistoryData } from '@/shared/types';
import { Group, Typography } from '@/shared/ui';
import typographyStyles from '@/shared/ui/baseComponents/Typography/Typography.module.scss';

export const tableColumns: TableColumns<DashboardHistoryData> = [
  {
    headerName: 'Date',
    key: 'transaction_ts',
    sortable: true,
    renderCell: (row) => (
      <Typography component="span" variant="poppins" order={2} weight="regular">
        {dayjs(row.transaction_ts).format('DD/MM/YYYY') + ' '}
        <Typography component="span" variant="poppins" order={2} weight="bold">
          {dayjs(row.transaction_ts).format('HH:mm')}
        </Typography>
      </Typography>
    ),
  },
  {
    headerName: 'Fund name',
    key: 'fund_name',
    sortable: true,
    searchable: true,
    cellProps: {
      className: clsx(typographyStyles.textPoppins2, 'font-bold'),
    },
  },
  {
    headerName: 'Operation',
    key: 'action',
    filterable: true,
    sortable: true,
    type: TableColumnType.enum,
    cellProps: {
      dictionary: { deposit: 'Deposit', withdraw: 'Withdraw' },
      className: clsx(typographyStyles.textPoppins2, 'text-white/80 font-bold'),
    },
  },
  {
    headerName: 'Share count',
    key: 'share_count',
    sortable: true,
    cellProps: {
      className: clsx(typographyStyles.textPoppins2, 'text-white/80 font-bold'),
    },
  },
  {
    headerName: 'TxID',
    key: 'transaction_hash',
    sortable: false,
    renderCell: (row) => (
      <a
        target="_blank"
        href={getExplorerProvider(row.chain_id) + '/tx/' + row.transaction_hash}
        rel="noreferrer"
      >
        {truncateMiddle(row.transaction_hash)}
      </a>
    ),
    cellProps: {
      className: clsx(typographyStyles.textPoppins2, 'text-white/80 font-bold'),
    },
    searchable: true,
  },
  {
    headerName: 'Token',
    key: 'token_in_name',
    sortable: false,
    renderCell: (row) => (
      <Group className="gap-1.5">
        <Image width={24} height={24} src={row.icon} alt={row.token_in_name} />
        <Typography variant="poppins" order={2} className="text-white/40">
          {row.token_in_name}
        </Typography>
      </Group>
    ),
  },
  {
    headerName: 'Amount',
    key: 'token_in_count',
    sortable: true,
    cellProps: {
      className: clsx(typographyStyles.textPoppins2, 'text-white/80 font-bold'),
    },
  },
] as const;
