import React from 'react';

import { Card, Skeleton } from '@heroui/react';
import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

// import styles from './SafetyScoreDetailsSkeleton.module.scss';

type VaultInfoSkeletonProps = {};

export const SafetyScoreDetailsSkeleton: ComponentWithProps<
  VaultInfoSkeletonProps
> = ({ className }) => {
  return (
    <Card className="w-full p-4 space-y-5" radius="lg">
      <div className="flex items-center space-x-4">
        <Skeleton className="rounded-full">
          <div className="h-12 w-12 rounded-full"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-8 w-24 rounded-lg"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-8 w-12 rounded-lg"></div>
        </Skeleton>
      </div>
      <Skeleton className="rounded-lg">
        <div className="h-6 w-full rounded-lg mb-2"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-6 w-3/4 rounded-lg mb-2"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-6 w-1/2 rounded-lg"></div>
      </Skeleton>
    </Card>
  );
};
