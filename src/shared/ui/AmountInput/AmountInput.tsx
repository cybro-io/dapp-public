'use client';

import React from 'react';

import clsx from 'clsx';

import { cleanFloatInput } from '@/shared/lib';
import { Chip, ChipViewType, Group, Text, TextView } from '@/shared/ui';
import { formatUserMoney } from '@/shared/utils';

import styles from './AmountInput.module.scss';
import { percentButtons } from './constants';
import { AmountInputProps } from './types';

export const AmountInput = React.forwardRef(
  (
    {
      onChange,
      onSelectPercent,
      max,
      helperText,
      usd,
      showPercent,
      isPositive = true,
      isOnlyNumber = true,
      disabled,
      rightLabelSegment,
      ...props
    }: AmountInputProps,
    ref: React.ForwardedRef<HTMLInputElement>,
  ) => {
    const { className, label } = props;

    const handlePercentChange = (percent: number) => {
      if (max) {
        onSelectPercent?.(percent);
      }
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      handlePercentChange(0);

      if (isOnlyNumber) {
        event.target.value = cleanFloatInput(event.target.value, isPositive);
      }

      onChange?.(event);
    };

    const isUSDVisible = Boolean(usd);

    return (
      <div className="flex flex-col gap-2 w-full">
        {(rightLabelSegment || label) && (
          <Group className="justify-between flex-nowrap">
            {label && (
              <Text className={styles.label} textView={TextView.C4}>
                {label}
              </Text>
            )}

            {rightLabelSegment}
          </Group>
        )}

        <div
          className={clsx(
            styles.inputContainer,
            !showPercent && '!border-none',
          )}
          data-double={isUSDVisible}
        >
          <input
            className={clsx(className, styles.input)}
            {...props}
            ref={ref}
            onChange={handleChange}
            disabled={disabled}
          />
          {isUSDVisible && (
            <span className={styles.equal}>≈ ${formatUserMoney(usd)}</span>
          )}
          {helperText && (
            <Chip
              viewType={ChipViewType.Warning}
              className="absolute -bottom-7 z-[1]"
            >
              {helperText}
            </Chip>
          )}
        </div>
        {showPercent && (
          <div className={styles.percentButtons}>
            {percentButtons.map(({ title, value }) => (
              <button
                type="button"
                key={value}
                className={clsx(styles.percentButton)}
                disabled={!max || disabled}
                onClick={() => handlePercentChange(value)}
              >
                {title}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  },
);
