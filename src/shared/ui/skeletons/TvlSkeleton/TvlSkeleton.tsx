import React from 'react';

import { Card, Skeleton } from '@nextui-org/react';
import clsx from 'clsx';

import { ComponentWithProps } from '@/shared/types';

type TvlSkeletonProps = {};

export const TvlSkeleton: ComponentWithProps<TvlSkeletonProps> = ({
  className,
}) => {
  return (
    <Card className={clsx(className, 'space-y-5 p-4')} radius="lg">
      <Skeleton className="rounded-lg w-28  h-full bg-secondary">
        <div className="rounded-lg bg-secondary"></div>
      </Skeleton>
    </Card>
  );
};
