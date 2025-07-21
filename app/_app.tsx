import React from 'react';

import { HeroUIProvider } from '@heroui/react';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import { AppProps } from 'next/app';

dayjs.extend(duration);
dayjs.extend(relativeTime);

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HeroUIProvider>
      <Component {...pageProps} />
    </HeroUIProvider>
  );
}
