import dynamic from 'next/dynamic';

export const AiBrokerPage = dynamic(
  () => import('./ui/AiBrokerPage').then((mod) => mod.AiBrokerPage),
  { ssr: false },
);

export { AiBrokerComingPage } from './ui/AiBrokerComingPage';
