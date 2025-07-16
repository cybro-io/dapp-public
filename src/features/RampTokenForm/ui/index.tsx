import { Skeleton } from '@heroui/react';
import dynamic from 'next/dynamic';

export const RampTokenForm = dynamic(() => import('./RampTokenForm'), {
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

export * from './RampWidgetStepModal';
export * from './RampAlertStepModal';
