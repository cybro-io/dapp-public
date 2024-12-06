import dynamic from 'next/dynamic';

export * from './VaultPage';

export const VaultPageV2 = dynamic(() => import('./VaultPageV2'), {
  ssr: false,
});
