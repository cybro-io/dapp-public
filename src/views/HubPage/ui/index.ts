import dynamic from 'next/dynamic';

export const HubPageV2 = dynamic(
  () => import('./HubPageV2').then((mod) => mod.HubPageV2),
  { ssr: false },
);
