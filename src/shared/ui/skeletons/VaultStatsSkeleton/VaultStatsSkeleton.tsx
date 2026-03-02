import React from 'react';

import { Card, Skeleton } from '@heroui/react';
import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

// import styles from './SafetyScoreDetailsSkeleton.module.scss';

type VaultInfoSkeletonProps = {};

export const VaultStatsSkeleton: ComponentWithProps<VaultInfoSkeletonProps> = ({
  className,
}) => {
  return (
    <Card className={clsx(className, 'space-y-5 p-4')} radius="lg">
      <div className="flex w-full gap-5">
        <Skeleton className="rounded-lg w-full h-16">
          <div className="rounded-lg bg-secondary mb-4"></div>
        </Skeleton>
        <Skeleton className="rounded-lg w-full h-16">
          <div className="h-16 rounded-lg bg-secondary"></div>
        </Skeleton>
        <Skeleton className="rounded-lg w-full h-16">
          <div className="h-16 rounded-lg bg-secondary"></div>
        </Skeleton>
      </div>
      <div className="flex w-full gap-5">
        <Skeleton className="rounded-lg w-full  h-16">
          <div className="rounded-lg bg-secondary mb-4"></div>
        </Skeleton>
        <Skeleton className="rounded-lg w-full  h-16">
          <div className="rounded-lg bg-secondary"></div>
        </Skeleton>
        <Skeleton className="rounded-lg w-full  h-16">
          <div className="rounded-lg bg-secondary"></div>
        </Skeleton>
      </div>
    </Card>
  );
};
