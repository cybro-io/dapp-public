import React from 'react';

import { capitalize } from '@nextui-org/shared-utils';
import * as lodash from 'lodash';
import numeral from 'numeral';

import { links, TableColumns, TableColumnType } from '@/shared/lib';
import { VaultResponseData } from '@/shared/types';
import {
  AlertTooltip,
  AssetIcon,
  TrustScore,
  TrustScoreViewType,
} from '@/shared/ui';

const getTokensFromVault = (vault: VaultResponseData) =>
  vault.tokens?.length ? vault.tokens : [vault.token];

export const createTableColumns = (
  chains: Array<string>,
  providers: Array<string>,
) => {
  const chainsSet = lodash.uniq(chains.map(capitalize));
  const providersSet = lodash.uniq(providers.map(capitalize));

  const tableColumns: TableColumns<VaultResponseData> = [
    {
      headerName: 'Fund name',
      key: 'name',
      sortable: true,
      searchable: true,
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
      headerName: '30-day APY',
      key: 'apy',
      sortable: true,
      headerProps: {
        className: 'text-right',
      },
      cellProps: {
        className: 'text-right',
      },
      renderCell: (row) => `${row.apy}%`,
    },
    {
      headerName: 'Trust score',
      key: 'trust_score',
      sortable: true,
      renderCell: (row) => (
        <TrustScore
          viewType={TrustScoreViewType.Small}
          value={row.trust_score}
        />
      ),
    },
    {
      headerName: 'Rebalancing',
      key: 'parameter.management_type',
      sortable: true,
      type: TableColumnType.enum,
      cellProps: {
        dictionary: {
          off: 'Off',
          auto: 'Auto',
        },
      },
      filterable: true,
      mountInvisible: true,
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
      filterable: true,
      cellProps: {
        dictionary: chainsSet.reduce(
          (acc, item) => ({ ...acc, [item]: item }),
          {},
        ),
      },
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
      mountInvisible: true,
    },
    {
      headerName: 'TVL',
      key: 'tvl',
      sortable: true,
      headerProps: {
        className: 'text-right',
      },
      cellProps: {
        className: 'text-right',
      },
      renderCell: (row) => numeral(row.tvl).format('0.00a'),
    },
    {
      headerName: 'Provider',
      key: 'provider.name',
      sortable: true,
      type: TableColumnType.enum,
      filterable: true,
      cellProps: {
        dictionary: providersSet.reduce(
          (acc, item) => ({ ...acc, [item]: item }),
          {},
        ),
      },
      mountInvisible: true,
    },
  ] as const;

  return tableColumns;
};
