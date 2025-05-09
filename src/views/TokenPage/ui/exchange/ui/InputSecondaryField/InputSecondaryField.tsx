'use client';

import React from 'react';

import { Skeleton } from '@heroui/react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import Image from 'next/image';

import ScoreUpIcon from '@/shared/assets/icons/arrow-score-up.svg?url';
import TimerIcon from '@/shared/assets/icons/clock.svg?url';
import { Typography } from '@/shared/ui';
import { formatNumber } from '@/shared/utils';

dayjs.extend(duration);

export type InputSecondaryFieldProps = React.PropsWithChildren & {
  currentRate: number | string;
  duration: number;
  isLoading?: boolean;
};

export const InputSecondaryField = ({
  children,
  currentRate,
  duration,
  isLoading,
}: InputSecondaryFieldProps) => {
  return (
    <div className="p-4 flex flex-col gap-2 border border-stroke-tableBorder rounded-[20px]">
      {children}
      <div className="w-full h-px border-dashed border border-stroke-tableBorder" />

      <div className="flex flex-row justify-between items-center">
        <Typography
          className="flex flex-row items-center gap-1"
          variant="caption"
          order={4}
        >
          <Image src={TimerIcon} alt="timer" />
          {dayjs.duration(duration).format('mm:ss')}
        </Typography>
        <div className="flex flex-row items-center gap-2">
          <Typography order={4} variant="caption" className="text-white/60">
            Current Rate:
          </Typography>
          <Typography
            order={4}
            variant="caption"
            className="flex flex-row items-center gap-1"
          >
            <Image src={ScoreUpIcon} alt="rate" />
            <Skeleton isLoaded={!isLoading} className="rounded-lg">
              ${formatNumber(currentRate)}
            </Skeleton>
          </Typography>
        </div>
      </div>
    </div>
  );
};
