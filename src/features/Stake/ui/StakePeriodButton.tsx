import React from 'react';

import clsx from 'clsx';

import {
  Group,
  InfoButtonTooltip,
  Stack,
  Title,
  Typography,
} from '@/shared/ui';

import classNames from './Stake.module.scss';

interface StakePeriodButtonProps {
  month: number;
  arpPercent: number;
  isActive?: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const StakePeriodButton = ({
  month,
  arpPercent,
  isActive,
  onClick,
  disabled = false,
}: StakePeriodButtonProps) => {
  return (
    <Stack
      onClick={() => {
        if (!disabled) {
          onClick();
        }
      }}
      data-active={Boolean(isActive)}
      data-disabled={disabled}
      className={clsx(
        classNames.bg,
        'w-[103px] p-2.5 rounded-[14px] justify-between',
      )}
    >
      <Group className="justify-between items-start">
        <Title order={2}>{month}</Title>

        {disabled && (
          <InfoButtonTooltip
            content={
              'Staking is disabled for this period.\nDepositing funds to the contract will result in their loss.'
            }
          />
        )}
      </Group>
      <Typography order={2} className="text-white/40">
        months
      </Typography>
      <Group
        className={clsx(
          'justify-center items-center px-2 py-1 rounded-md',
          isActive
            ? 'text-text-accent-logoYellow bg-trustScore-yellow-100/15'
            : 'bg-background-tableRow  text-white/80',
        )}
      >
        <Typography order={3} weight="bold">
          {arpPercent}% APR
        </Typography>
      </Group>
    </Stack>
  );
};
