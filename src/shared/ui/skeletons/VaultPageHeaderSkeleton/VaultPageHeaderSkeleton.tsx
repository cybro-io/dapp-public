import React from 'react';

import { Skeleton } from '@nextui-org/react';

export const VaultPageHeaderSkeleton: React.FC = () => {
  return (
    <div className="w-full space-y-5 p-4 bg-background-window flex flex-col">
      <Skeleton className="rounded-full mx-auto mb-4">
        <div className="h-20 w-20 rounded-full mx-auto"></div>
      </Skeleton>
      <div className="space-y-2">
        <Skeleton className="rounded-lg mx-auto mb-4 w-1/4">
          <div className="h-10 rounded-lg mx-auto"></div>
        </Skeleton>
        <Skeleton className="rounded-lg mx-auto mb-4 w-2/4">
          <div className="h-10 rounded-lg mx-auto"></div>
        </Skeleton>
      </div>
      <div>
        <Skeleton className="rounded-lg mx-auto mb-4 w-2/4">
          <div className="h-1 rounded-lg mx-auto"></div>
        </Skeleton>
        <Skeleton className="rounded-lg mx-auto mb-4 w-2/4">
          <div className="h-1 rounded-lg mx-auto"></div>
        </Skeleton>
        <Skeleton className="rounded-lg mx-auto mb-4 w-2/4">
          <div className="h-1 rounded-lg mx-auto"></div>
        </Skeleton>
      </div>
      <div className="flex justify-center space-x-4 mt-4">
        <Skeleton className="rounded-lg">
          <div className="h-10 w-20 rounded-lg"></div>
        </Skeleton>
        <Skeleton className="rounded-lg">
          <div className="h-10 w-20 rounded-lg"></div>
        </Skeleton>
      </div>
    </div>
  );
};
