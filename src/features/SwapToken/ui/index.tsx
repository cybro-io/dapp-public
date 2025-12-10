import { Skeleton } from '@heroui/react';
import dynamic from 'next/dynamic';

export const SwapTokenForm = dynamic(() => import('./SwapTokenForm'), {
  ssr: false,
  loading: () => (
    <Skeleton
      disableAnimation
      classNames={{
        base: 'rounded-lg w-full h-[737px] dark:bg-background-tableRow',
      }}
    />
  ),
});
