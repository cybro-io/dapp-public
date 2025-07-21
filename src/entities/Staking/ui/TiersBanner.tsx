import React from 'react';

import clsx from 'clsx';
import { useRouter } from 'next/navigation';

import { Button, ButtonSize, Group, Typography } from '@/shared/ui';

import styles from './TiersBanner.module.scss';

interface TiersBannerProps {
  onClick?: () => void;
}
export const TiersBanner = ({ onClick }: TiersBannerProps) => {
  const router = useRouter();

  return (
    <Group
      className={clsx(
        'gap-2 justify-between h-[58px] items-center pl-[19px] w-full',
        styles.bg,
      )}
    >
      <Typography
        variant="unbounded"
        uppercase
        weight="semi-bold"
        className="whitespace-pre-wrap !text-[15px] !leading-[18px]"
      >
        <span className="text-text-accent-logoYellow">Stake more,</span>
        {'\nsave on fees'}
      </Typography>
      <Button
        size={ButtonSize.Small}
        onClick={() => {
          onClick?.();
          router.push('/staking?tiers');
        }}
      >
        Explore Tiers
      </Button>
    </Group>
  );
};
