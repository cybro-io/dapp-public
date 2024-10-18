import { Skeleton } from '@nextui-org/react';
import dynamic from 'next/dynamic';

export const AvailableVaults = dynamic(() => import('./AvailableVaults'), {
  ssr: false,
  loading: () => (
    <Skeleton
      classNames={{
        base: 'w-full h-[425px] rounded-xl dark:bg-background-tableRow',
      }}
    />
  ),
});
