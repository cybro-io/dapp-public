import dynamic from 'next/dynamic';

import { Loader } from '@/shared/ui';

export const TokenPage = dynamic(() => import('./ui/TokenPage'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[425px] flex items-center justify-center">
      <Loader />
    </div>
  ),
});
