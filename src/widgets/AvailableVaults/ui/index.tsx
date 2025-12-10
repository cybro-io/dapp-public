import dynamic from 'next/dynamic';

import { Loader } from '@/shared/ui';

export const AvailableVaultsV2 = dynamic(() => import('./AvailableVaultsV2'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[425px] flex items-center justify-center">
      <Loader />
    </div>
  ),
});
