import dynamic from 'next/dynamic';

import { Loader } from '@/shared/ui';

export const ReferralPage = dynamic(
  () => import('./ReferralPage').then((m) => m.ReferralPage),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[425px] flex items-center justify-center">
        <Loader />
      </div>
    ),
  },
);
