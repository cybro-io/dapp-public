import dynamic from 'next/dynamic';

export const HubPage = dynamic(() => import('./HubPage'), { ssr: false });
