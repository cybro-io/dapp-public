import React from 'react';

import { Card, Skeleton } from '@heroui/react';

export const VaultSkeleton: React.FC = () => {
  return (
    <Card className="space-y-5 p-4" radius="lg">
      <div className="flex space-x-4">
        <Skeleton className="rounded-full">
          <div className="h-12 w-12 rounded-full"></div>
        </Skeleton>
        <div className="flex-1 space-y-2 py-1">
          <Skeleton className="rounded-lg">
            <div className="h-4 rounded-lg w-3/4"></div>
          </Skeleton>
          <Skeleton className="rounded-lg">
            <div className="h-4 rounded-lg w-1/2"></div>
          </Skeleton>
        </div>
      </div>
      <Skeleton className="rounded-lg">
        <div className="h-20 rounded-lg w-full"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-5 rounded-lg w-full"></div>
      </Skeleton>
      <Skeleton className="rounded-lg">
        <div className="h-5 rounded-lg w-full"></div>
      </Skeleton>
      <div className="space-y-3">
        <Skeleton className="rounded-lg">
          <div className="h-5 rounded-lg w-1/3"></div>
        </Skeleton>
      </div>
    </Card>
  );
};
