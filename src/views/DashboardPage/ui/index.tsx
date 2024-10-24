import { Skeleton } from '@nextui-org/react';
import dynamic from 'next/dynamic';

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
