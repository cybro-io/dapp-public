import React from 'react';

import clsx from 'clsx';

import {
  getTrustScoreColor,
  Group,
  Title,
  TrustScoreColorToIcon,
} from '@/shared/ui';
import { formatTrustScore } from '@/shared/utils';

import { TrustScoreProps } from './TrustScore';
import styles from './TrustScore.module.scss';

export const TrustScoreSmallSecondary = ({
  value,
}: Omit<TrustScoreProps, 'viewType' | 'isBordered'>) => {
  const trustScoreColor = React.useMemo(
    () => getTrustScoreColor(value),
    [value],
  );

  return (
    <Group
      className={clsx(
        styles.smallSecondaryRoot,
        'flex-nowrap gap-1.5 w-fit px-3 py-2 rounded-[8px]',
        styles[trustScoreColor],
      )}
    >
      {React.cloneElement(TrustScoreColorToIcon[trustScoreColor], {
        className: 'shrink-0 size-5',
      })}{' '}
      <Title
        order={4}
        className={clsx(styles.smallSecondaryValue, styles[trustScoreColor])}
      >
        {formatTrustScore(value)}
      </Title>
    </Group>
  );
};
