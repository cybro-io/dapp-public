import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'CYBRO',
    short_name: 'CYBRO',
    description:
      'CYBRO is an earn marketplace where users can choose investment tools based on desired returns and risk levels, including staking, farming, and lending',
    start_url: '/',
    display: 'standalone',
    theme_color: '#11121a',
    background_color: '#11121a',
    icons: [
      {
        src: '/favicons/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicons/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicons/favicon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/favicons/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        sizes: '180x180',
        src: '/favicons/apple-touch-icon.png',
      },
    ],
  };
}
