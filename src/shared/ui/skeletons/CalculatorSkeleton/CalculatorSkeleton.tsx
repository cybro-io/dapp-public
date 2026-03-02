import React from 'react';

import { Card, Skeleton } from '@heroui/react';
import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

type CalculatorSkeletonProps = {};

export const CalculatorSkeleton: ComponentWithProps<
  CalculatorSkeletonProps
> = ({ className }) => {
  return (
    <Card className="w-full p-4 space-y-5" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-6 w-2/3 rounded-lg mb-4"></div>
      </Skeleton>
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton className="rounded-lg">
          <div className="h-6 w-1/4 rounded-lg"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-6 w-1/4 rounded-lg"></div>
        </Skeleton>
      </div>
      <div className="space-y-3">
        <Skeleton className="rounded-lg">
          <div className="h-6 w-1/3 rounded-lg mb-4"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-10 w-full rounded-lg mb-4"></div>
        </Skeleton>
        <div className="flex items-center space-x-2 mb-4">
          <Skeleton className="rounded-lg">
            <div className="h-6 w-1/5 rounded-lg"></div>
          </Skeleton>
          <Skeleton className="rounded-lg">
            <div className="h-6 w-1/5 rounded-lg"></div>
          </Skeleton>
          <Skeleton className="rounded-lg">
            <div className="h-6 w-1/5 rounded-lg"></div>
          </Skeleton>
          <Skeleton className="rounded-lg">
            <div className="h-6 w-1/5 rounded-lg"></div>
          </Skeleton>
          <Skeleton className="rounded-lg">
            <div className="h-6 w-1/5 rounded-lg"></div>
          </Skeleton>
        </div>
        <Skeleton className="rounded-lg">
          <div className="h-6 w-1/3 rounded-lg mb-4"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-10 w-full rounded-lg mb-4"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-10 w-full rounded-lg mb-4"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-12 w-full rounded-lg"></div>
        </Skeleton>
      </div>
    </Card>
  );
};
