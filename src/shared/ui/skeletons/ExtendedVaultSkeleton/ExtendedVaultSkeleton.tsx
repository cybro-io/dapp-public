import React from 'react';

import { Card, Skeleton } from '@heroui/react';

import { ComponentWithProps } from '@/shared/types';

type ExtendedVaultSkeletonProps = {};

export const ExtendedVaultSkeleton: ComponentWithProps<
  ExtendedVaultSkeletonProps
> = ({ className }) => {
  return (
    <Card className="w-full p-4 space-y-5" radius="lg">
      <div className="space-y-3">
        <Skeleton className="rounded-lg">
          <div className="h-6 w-1/3 rounded-lg mb-4"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-6 w-full rounded-lg mb-2"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-6 w-full rounded-lg mb-2"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-6 w-3/4 rounded-lg mb-4"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-10 w-1/2 rounded-lg mb-4"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-32 w-full rounded-lg mb-4"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-6 w-1/3 rounded-lg mb-2"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-6 w-full rounded-lg mb-4"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-12 w-1/3 rounded-lg mb-2"></div>
        </Skeleton>
      </div>
    </Card>
  );
};
