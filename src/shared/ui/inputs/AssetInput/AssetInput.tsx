'use client';

import React from 'react';

import { Skeleton } from '@heroui/react';
import { BigNumber } from 'bignumber.js';
import clsx from 'clsx';

import { cleanFloatInput } from '@/shared/lib';
import { Text, TextView } from '@/shared/ui';

import { AssetIcon, AssetIconProps } from '../../AssetIcon';

export interface AssetInputProps {
  title: string;
  iconProps: AssetIconProps;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
  rightSegment?: React.ReactNode;
  onClickPercent?: (value: number) => void;
  isDisabledPercent?: boolean;
  isLoading?: boolean;
}

export const AssetInput = ({
  iconProps,
  inputProps,
  title,
  rightSegment,
  onClickPercent,
  isDisabledPercent,
  isLoading,
}: AssetInputProps) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.value = cleanFloatInput(event.target.value, true);

    if (new BigNumber(event.target.value).gt(9_999_999.999999)) {
      event.target.value = '9999999';
    }

    inputProps?.onChange?.(event);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-row gap-2 items-center">
        <div className="shrink-0">
          <AssetIcon {...iconProps} />
        </div>

        <div className="flex flex-row items-end gap-1">
          <div className={clsx('flex-1 flex flex-col')}>
            <Text textView={TextView.C4} className="!text-white/60">
              {title}
            </Text>
            <Skeleton
              isLoaded={!isLoading}
              className="rounded-lg dark:bg-background-tableRow w-1/2"
            >
              <input
                {...inputProps}
                onChange={handleChange}
                className={clsx(
                  'outline-0 bg-transparent font-unbounded font-bold truncate leading-6',
                  rightSegment && 'max-w-[182px]',
                  inputProps?.className,
                )}
              />
            </Skeleton>
          </div>
          {rightSegment && (
            <Skeleton
              isLoaded={!isLoading}
              className="rounded-lg dark:bg-background-tableRow"
            >
              <div className="flex-1">
                <Text textView={TextView.C4} className="flex-1 !text-white/40">
                  {rightSegment}
                </Text>
              </div>
            </Skeleton>
          )}
        </div>
      </div>
      {onClickPercent && (
        <div className="flex flex-row justify-between gap-[3px]">
          {[5, 25, 50, 75, 100].map((value) => (
            <button
              disabled={isDisabledPercent}
              onClick={() => onClickPercent(value / 100)}
              key={value}
              className={clsx(
                'bg-background-chips rounded-[20px] h-7 flex-1',
                'disabled:cursor-not-allowed hover:enabled:outline hover:enabled:outline-1 hover:enabled:outline-white/60',
              )}
            >
              <Text textView={TextView.BP3}>
                {value === 100 ? 'MAX' : `${value}%`}
              </Text>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
