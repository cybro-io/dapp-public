import { Skeleton } from '@nextui-org/react';
import dynamic from 'next/dynamic';

import { Loader } from '@/shared/ui';

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

export const AvailableVaultsV2 = dynamic(() => import('./AvailableVaultsV2'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[425px] flex items-center justify-center">
      <Loader />
    </div>
  ),
});
