import { Skeleton } from '@nextui-org/react';
import dynamic from 'next/dynamic';

import { Loader } from '@/shared/ui';

export const DashboardPage = dynamic(() => import('./DashboardPage'), {
  ssr: false,
  loading: () => (
    <Skeleton
      disableAnimation
      classNames={{
        base: 'rounded-lg w-full mt-6 h-[560px] dark:bg-background-tableRow',
      }}
    />
  ),
});

export const DashboardV2Page = dynamic(() => import('./DashboardV2Page'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[425px] flex items-center justify-center">
      <Loader />
    </div>
  ),
});
