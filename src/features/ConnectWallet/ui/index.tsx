import { Skeleton } from '@heroui/react';
import dynamic from 'next/dynamic';

export const ConnectWallet = dynamic(() => import('./ConnectWallet'), {
  ssr: false,
  loading: () => (
    <Skeleton
      classNames={{
        base: 'w-[110px] md:w-[176px] h-9 rounded-lg dark:bg-background-tableRow',
      }}
    />
  ),
});
