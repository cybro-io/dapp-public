import React from 'react';

import { Skeleton } from '@nextui-org/react';
import clsx from 'clsx';
import numeral from 'numeral';

import { useTotalStaked } from '@/entities/Staking';
import { Group, Stack, Title, Typography } from '@/shared/ui';

export const TotalStaked = () => {
  const { totalStaked, isLoadingTotalStaked } = useTotalStaked();

  return (
    <Stack className="gap-2">
      <Title order={4}>Total staked:</Title>
      <Group className="justify-evenly">
        {totalStaked.map((stake) => (
          <Stack key={stake.months} className={clsx('gap-1 flex-1')}>
            <Typography variant="caption" order={4} className="text-white/60">
              {stake.months} Month
            </Typography>
            <Group className="gap-2 items-center">
              <Skeleton isLoaded={!isLoadingTotalStaked} className="rounded-lg">
                <Typography order={1}>
                  {numeral(stake.amount).format('0.00a')}
                </Typography>
              </Skeleton>
            </Group>
          </Stack>
        ))}
      </Group>

      <Typography
        variant="caption"
        order={4}
        className="text-text-accent-yellow"
      >
        A total of 5 million points will be distributed among all LCYBRO stakers
        who stake their tokens before the listing date.
      </Typography>
    </Stack>
  );
};
