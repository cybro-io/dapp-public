'use client';

import React from 'react';

import { Skeleton } from '@heroui/react';
import clsx from 'clsx';

import { ComponentWithProps, useGetTvlApiV1CommonTvlGet } from '@/shared/types';
import { Chip, ChipViewType } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

type TvlProps = {};

export const Tvl: ComponentWithProps<TvlProps> = ({ className }) => {
  const { data, isSuccess } = useGetTvlApiV1CommonTvlGet();

  const tvl = data?.data?.data?.tvl;

  return (
    <Skeleton
      isLoaded={isSuccess}
      className="rounded-lg dark:bg-background-tableRow"
    >
      <Chip
        viewType={ChipViewType.Outlined}
        className={clsx(className, 'w-fit')}
      >
        Cybro TVL ${typeof tvl === 'number' ? formatUserMoney(tvl) : '-'}
      </Chip>
    </Skeleton>
  );
};
