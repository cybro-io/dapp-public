import React from 'react';

import { Skeleton } from '@heroui/react';
import clsx from 'clsx';
import { BigNumberish } from 'ethers';
import numeral from 'numeral';

import { Group, Stack, Typography } from '@/shared/ui';

interface TotalStakedFieldProps {
  months: number;
  isLoading?: boolean;
  amount: BigNumberish;
}

export const TotalStakedField = ({
  months,
  amount,
  isLoading,
}: TotalStakedFieldProps) => {
  return (
    <Stack key={months} className={clsx('gap-1 flex-1')}>
      <Typography variant="caption" order={4} className="text-white/60">
        {months} Month
      </Typography>
      <Group className="gap-2 items-center">
        <Skeleton isLoaded={!isLoading} className="rounded-lg">
          <Typography order={1}>{numeral(amount).format('0.00a')}</Typography>
        </Skeleton>
      </Group>
    </Stack>
  );
};
