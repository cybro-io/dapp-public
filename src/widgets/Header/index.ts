import dynamic from 'next/dynamic';

export const Header = dynamic(
  () => import('./Header').then((mod) => mod.Header),
  { ssr: false },
);
