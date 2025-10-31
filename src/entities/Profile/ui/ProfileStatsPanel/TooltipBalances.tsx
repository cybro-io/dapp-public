import React from 'react';

import { getChainById } from '@lifi/data-types';

import { GetCybroBalanceResponse } from '@/entities/Staking/model/useCybroBalance';
import { InfoButtonTooltip, Stack, Typography } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

interface TooltipBalancesProps {
  balances: GetCybroBalanceResponse[] | undefined;
  field: keyof GetCybroBalanceResponse;
}

export const TooltipBalances = ({ balances, field }: TooltipBalancesProps) => {
  return (
    <InfoButtonTooltip
      buttonClassName="bg-background-window"
      content={
        <Stack className="gap-1">
          {balances?.map((balanceItem) => (
            <Typography key={balanceItem.chainId} variant="caption" order={4}>
              {getChainById(balanceItem.chainId).name}:&nbsp;
              {formatUserMoney(balanceItem[field])}
            </Typography>
          ))}
        </Stack>
      }
    />
  );
};
