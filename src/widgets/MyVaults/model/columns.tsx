import Image from 'next/image';

import { links, TableColumns } from '@/shared/lib';
import { InvestmentData } from '@/shared/types';
import { Group, Typography } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import { myVaultsPeriodNames } from '../lib/constants';

import { MyVaultPeriod } from './types';

export const createTableColumns = (period: MyVaultPeriod) => {
  const tableColumns: TableColumns<InvestmentData> = [
    {
      headerName: 'Vault name',
      key: 'fund_name',
    },
    {
      headerName: 'Token',
      key: 'token_name',

      renderCell: (row) => (
        <Group className="gap-1.5">
          <Image
            width={24}
            height={24}
            src={row.token_icon ?? links.noImage}
            alt={row.token_name}
          />
          <Typography
            variant="poppins"
            order={2}
            weight="regular"
            className="text-white/40"
          >
            {row.token_name}
          </Typography>
        </Group>
      ),
    },
    {
      mountInvisible: true,
      headerName: 'Share count',
      key: 'share_count',

      headerProps: {
        className: 'text-right',
      },
      cellProps: {
        className: 'text-right',
      },

      renderCell: (row) =>
        row.share_count ? formatUserMoney(row.share_count, 6, 6) : '-',
    },
    {
      headerName: 'Balance in token',
      key: 'equity_in_token',

      headerProps: {
        className: 'text-right',
      },
      cellProps: {
        className: 'text-right',
      },

      renderCell: (row) =>
        row.equity_in_token ? formatUserMoney(row.equity_in_token, 6, 6) : '-',
    },
    {
      headerName: 'Balance in USD',
      key: 'equity_currency',

      headerProps: {
        className: 'text-right',
      },
      cellProps: {
        className: 'text-right',
      },

      renderCell: (row) =>
        row.equity_currency
          ? `$${formatUserMoney(row.equity_currency, 2, 2)}`
          : '-',
    },
    {
      headerName: `Profit in token (${myVaultsPeriodNames[period]})`,
      key: 'profit',

      headerProps: {
        className: 'text-right',
      },
      cellProps: {
        className: 'text-right',
      },

      renderCell: (row) =>
        row.profit ? `${formatUserMoney(row.profit, 6, 6)}` : '—',
    },
    {
      headerName: `Profitability (${myVaultsPeriodNames[period]})`,
      key: 'profitability',

      headerProps: {
        className: 'text-right',
      },
      cellProps: {
        className: 'text-right',
      },

      renderCell: (row) => (row.profitability ? `${row.profitability}%` : '—'),
    },
  ] as const;

  return tableColumns;
};
