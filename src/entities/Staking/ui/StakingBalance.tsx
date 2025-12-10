import React from 'react';

import { Skeleton } from '@heroui/react';
import clsx from 'clsx';

import { Group, Stack, Typography } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

interface StakingBalanceProps
  extends Pick<React.HTMLAttributes<HTMLDivElement>, 'className'> {
  title: string;
  icon: React.ReactNode;
  balance: string | number;
  balanceUSD?: number;
  isLoading?: boolean;
}

export const StakingBalance = ({
  icon,
  title,
  balanceUSD,
  balance,
  className,
  isLoading,
}: StakingBalanceProps) => {
  return (
    <Stack className={clsx('gap-1', className)}>
      <Typography variant="caption" order={4} className="text-white/60">
        {title}
      </Typography>
      <Group className="gap-2 items-center">
        {icon}
        <Skeleton isLoaded={!isLoading} className="rounded-lg">
          <Typography order={1}>{formatUserMoney(balance)}</Typography>
        </Skeleton>
        {typeof balanceUSD === 'number' && (
          <Typography variant="caption" order={4} className="text-white/40">
            ≈ ${formatUserMoney(balanceUSD)}
          </Typography>
        )}
      </Group>
    </Stack>
  );
};
