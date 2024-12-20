import Image from 'next/image';

import { links, TableColumns } from '@/shared/lib';
import { InvestmentData } from '@/shared/types';
import { Group, Typography } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';
import { periodNames, PeriodTab } from '@/widgets/BalanceHistory';

export const createTableColumns = (period: PeriodTab) => {
  const tableColumns: TableColumns<InvestmentData> = [
    {
      headerName: 'Vault name',
      key: 'fund.name',
    },
    {
      headerName: 'Share count',
      key: 'share_count',

      renderCell: (row) =>
        row.share_count ? formatUserMoney(row.share_count) : '-',
    },
    {
      headerName: 'Equity in token',
      key: 'equity_in_token',

      renderCell: (row) =>
        row.equity_in_token ? formatUserMoney(row.equity_in_token) : '-',
    },
    {
      headerName: 'Token',
      key: 'token.name',

      renderCell: (row) => (
        <Group className="gap-1.5">
          <Image
            width={24}
            height={24}
            src={row.token.icon ?? links.noImage}
            alt={row.token.name}
          />
          <Typography variant="poppins" order={2} className="text-white/40">
            {row.token.name}
          </Typography>
        </Group>
      ),
    },
    {
      headerName: `Profit (${periodNames[period]})`,
      key: 'profit',

      renderCell: (row) => (row.profit ? `${row.profit}` : '-'),
    },
    {
      headerName: `Profitability (${periodNames[period]})`,
      key: 'profitability',

      renderCell: (row) => (row.profitability ? `${row.profitability}%` : 'n/a'),
    },
  ] as const;

  return tableColumns;
};
