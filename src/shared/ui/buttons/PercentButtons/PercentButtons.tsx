import React from 'react';

import clsx from 'clsx';

import { Group } from '@/shared/ui';

import { percentButtons } from './constants';
import styles from './PercentButton.module.scss';

interface PercentButtonsProps {
  isDisabled?: boolean;
  onSelectPercent?: (value: number) => void;
}
export const PercentButtons = ({
  isDisabled = false,
  onSelectPercent,
}: PercentButtonsProps) => {
  return (
    <Group className="flex-nowrap gap-1">
      {percentButtons.map(({ title, value }) => (
        <button
          type="button"
          key={value}
          className={clsx(styles.percentButton)}
          disabled={isDisabled}
          onClick={() => onSelectPercent?.(value)}
        >
          {title}
        </button>
      ))}
    </Group>
  );
};
