import { Skeleton } from '@heroui/react';
import dynamic from 'next/dynamic';

export const Exchange = dynamic(() => import('./ui/Exchange'), {
  ssr: false,
  loading: () => (
    <Skeleton
      classNames={{
        base: 'rounded-lg w-[335px] lg:w-full max-w-[1294px] mx-auto h-[355px] lg:h-[626px]',
      }}
    />
  ),
});
